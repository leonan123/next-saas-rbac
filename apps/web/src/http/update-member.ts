import type { Role } from '@saas/auth'

import { api } from './api-client'

interface UpdateMemberRequest {
  orgSlug: string
  memberId: string
  role: Role
}

type UpdateMemberResponse = void

export async function updateMember({
  memberId,
  role,
  orgSlug,
}: UpdateMemberRequest): Promise<UpdateMemberResponse> {
  await api.put(`organizations/${orgSlug}/members/${memberId}`, {
    json: {
      role,
    },
  })
}
