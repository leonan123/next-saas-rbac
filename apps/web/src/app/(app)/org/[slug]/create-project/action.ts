'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { getCurrentOrg } from '@/auth/auth'
import { createProject } from '@/http/create-project'

const createProjectSchema = z.object({
  name: z.string().min(4, 'Please, provide a valid organization name.'),
  description: z.string(),
})

export async function createProjectAction(data: FormData) {
  const result = createProjectSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors

    return { success: false, message: null, fieldErrors }
  }

  const { name, description } = result.data

  try {
    await createProject({
      name,
      description,
      orgSlug: getCurrentOrg()!,
    })
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
