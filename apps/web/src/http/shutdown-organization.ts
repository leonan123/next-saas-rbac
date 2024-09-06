import { api } from './api-client'

interface shutdownOrganizationRequest {
  orgSlug: string
}

export async function shutdownOrganization({
  orgSlug,
}: shutdownOrganizationRequest) {
  await api.delete(`organizations/${orgSlug}`)
}
