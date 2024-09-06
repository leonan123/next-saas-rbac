import type { Role } from '@saas/auth'

import { api } from './api-client'

type GetMembershipRequest = string

interface GetMembershipResponse {
  membership: {
    id: string
    role: Role
    userId: string
    organizationId: string
  }
}

export async function getMembership(orgSlug: GetMembershipRequest) {
  return await api
    .get(`organizations/${orgSlug}/membership`)
    .json<GetMembershipResponse>()
}
