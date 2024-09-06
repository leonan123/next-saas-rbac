'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { getCurrentOrg } from '@/auth/auth'
import { createOrganization } from '@/http/create-organization'
import { updateOrganization } from '@/http/update-organization'

const organizationSchema = z
  .object({
    name: z.string().min(4, 'Please, provide a valid organization name.'),
    domain: z
      .string()
      .nullable()
      .refine(
        (value) => {
          if (value) {
            const domainRegex = /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/

            return domainRegex.test(value)
          }

          return true
        },
        {
          message: 'Please, provide a valid e-mail domain.',
        },
      ),
    shouldAttachUsersByDomain: z
      .union([z.literal('off'), z.literal('on'), z.boolean()])
      .default(false)
      .transform((value) => value === true || value === 'on'),
  })
  .refine(
    (data) => {
      if (data.shouldAttachUsersByDomain === true && !data.domain) {
        return false
      }

      return true
    },
    {
      message: 'Domain is required when auto-join is enabled.',
      path: ['domain'],
    },
  )

export type TOrganizationSchema = z.infer<typeof organizationSchema>

export async function createOrganizationAction(data: FormData) {
  const result = organizationSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors

    return { success: false, message: null, fieldErrors }
  }

  const { name, domain, shouldAttachUsersByDomain } = result.data

  try {
    await createOrganization({
      name,
      domain,
      shouldAttachUsersByDomain,
    })

    revalidateTag('organizations')
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { success: false, message, fieldErrors: null }
    }

    console.error(err)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      fieldErrors: null,
    }
  }

  return {
    success: true,
    message: 'Successfully saved the organization.',
    fieldErrors: null,
  }
}

export async function updateOrganizationAction(data: FormData) {
  const currentOrgSlug = getCurrentOrg()!
  const result = organizationSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors

    return { success: false, message: null, fieldErrors }
  }

  const { name, domain, shouldAttachUsersByDomain } = result.data

  try {
    await updateOrganization({
      orgSlug: currentOrgSlug,
      name,
      domain,
      shouldAttachUsersByDomain,
    })

    revalidateTag('organizations')
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { success: false, message, fieldErrors: null }
    }

    console.error(err)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      fieldErrors: null,
    }
  }

  return {
    success: true,
    message: 'Successfully saved the organization.',
    fieldErrors: null,
  }
}
