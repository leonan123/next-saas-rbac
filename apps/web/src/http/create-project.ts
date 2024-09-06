import { api } from './api-client'

interface CreateProjectRequest {
  name: string
  description: string
  orgSlug: string
}

type CreateProjectResponse = void

export async function createProject({
  name,
  description,
  orgSlug,
}: CreateProjectRequest): Promise<CreateProjectResponse> {
  return await api
    .post(`organizations/${orgSlug}/projects`, {
      json: {
        name,
        description,
        orgSlug,
      },
    })
    .json<CreateProjectResponse>()
}
