import { api } from './api-client'
interface GetOrganizationsResponse {
  organization: {
    id: string
    name: string
    slug: string
    domain: string | null
    shouldAttachUsersByDomain: boolean
    avatarUrl: string | null
    createdAt: string
    updatedAt: string
    ownerId: string
  }
}

export async function getOrganization(orgSlug: string) {
  return await api
    .get(`organizations/${orgSlug}`)
    .json<GetOrganizationsResponse>()
}
