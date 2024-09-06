import { api } from './api-client'

type AcceptInviteResponse = void

export async function acceptInvite(inviteId: string) {
  return await api
    .post(`invites/${inviteId}/accept`)
    .json<AcceptInviteResponse>()
}
