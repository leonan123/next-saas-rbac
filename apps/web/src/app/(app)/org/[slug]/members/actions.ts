'use server'

import { type Role, roleSchema } from '@saas/auth'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { getCurrentOrg } from '@/auth/auth'
import { createInvite } from '@/http/create-invite'
import { removeMember } from '@/http/remove-member'
import { revokeInvite } from '@/http/revoke-invite'
import { updateMember } from '@/http/update-member'

export async function removeMemberAction(memberId: string) {
  const currentOrg = getCurrentOrg()!

  await removeMember({ orgSlug: currentOrg, memberId })

  revalidateTag(`${currentOrg}/members`)
}

export async function updateMemberAction(memberId: string, role: Role) {
  const currentOrg = getCurrentOrg()!

  await updateMember({ orgSlug: currentOrg, memberId, role })

  revalidateTag(`${currentOrg}/members`)
}

export async function revokeInviteAction(inviteId: string) {
  const currentOrg = getCurrentOrg()!

  await revokeInvite({ orgSlug: currentOrg, inviteId })

  revalidateTag(`${currentOrg}/invites`)
}

const createProjectSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  role: roleSchema,
})

export async function createInviteAction(data: FormData) {
  const result = createProjectSchema.safeParse(Object.fromEntries(data))
  const currentOrg = getCurrentOrg()!

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors

    return { success: false, message: null, fieldErrors }
  }

  const { email, role } = result.data

  try {
    await createInvite({
      orgSlug: currentOrg,
      email,
      role,
    })

    revalidateTag(`${currentOrg}/invites`)
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
    message: 'Successfully created the invite.',
    fieldErrors: null,
  }
}
