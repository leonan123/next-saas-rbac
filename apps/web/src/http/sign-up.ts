import { api } from './api-client'

interface SignUpWithGithubRequest {
  name: string
  email: string
  password: string
}

type SignUpWithGithubResponse = void

export async function signUp({
  name,
  email,
  password,
}: SignUpWithGithubRequest): Promise<SignUpWithGithubResponse> {
  await api
    .post('users', {
      json: {
        name,
        email,
        password,
      },
    })
    .json<SignUpWithGithubResponse>()
}
