import { api } from './api-client'

interface UpdateOrganizationRequest {
  name: string
  domain: string | null
  orgSlug: string
  shouldAttachUsersByDomain: boolean
}

type UpdateOrganizationResponse = void

export async function updateOrganization({
  name,
  domain,
  orgSlug,
  shouldAttachUsersByDomain,
}: UpdateOrganizationRequest): Promise<UpdateOrganizationResponse> {
  await api.put(`organizations/${orgSlug}`, {
    json: {
      name,
      domain,
      shouldAttachUsersByDomain,
    },
  })
}
