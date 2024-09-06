import { api } from './api-client'

interface revokeInviteRequest {
  orgSlug: string
  inviteId: string
}

export async function revokeInvite({ orgSlug, inviteId }: revokeInviteRequest) {
  await api.delete(`organizations/${orgSlug}/invites/${inviteId}`)
}
