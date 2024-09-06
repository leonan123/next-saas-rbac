import { api } from './api-client'

interface removeMemberRequest {
  orgSlug: string
  memberId: string
}

export async function removeMember({ orgSlug, memberId }: removeMemberRequest) {
  await api.delete(`organizations/${orgSlug}/members/${memberId}`)
}
