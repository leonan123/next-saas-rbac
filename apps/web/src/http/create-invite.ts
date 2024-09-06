import type { Role } from '@saas/auth'

import { api } from './api-client'

interface CreateInviteRequest {
  orgSlug: string
  email: string
  role: Role
}

type CreateInviteResponse = void

export async function createInvite({
  email,
  role,
  orgSlug,
}: CreateInviteRequest): Promise<CreateInviteResponse> {
  return await api
    .post(`organizations/${orgSlug}/invites`, {
      json: {
        email,
        role,
      },
    })
    .json<CreateInviteResponse>()
}
