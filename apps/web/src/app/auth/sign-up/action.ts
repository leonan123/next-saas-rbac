'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { signUp } from '@/http/sign-up'

const signUpSchema = z
  .object({
    name: z.string().refine((value) => value.split(' ').length > 1, {
      message: 'Please, provide your full name.',
    }),
    email: z
      .string()
      .email({ message: 'Please, provide a valid e-mail address.' }),
    password: z.string().min(1, 'Please, provide your password.'),
    confirm_password: z.string().optional(),
  })
  .refine((data) => data.password !== data.confirm_password, {
    message: 'Password confirmation does not match.',
    path: ['confirm_password'],
  })

export async function signUpAction(data: FormData) {
  const result = signUpSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors

    return { success: false, message: null, fieldErrors }
  }

  const { name, email, password } = result.data

  try {
    await signUp({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { success: false, message, fieldErrors: null }
    }

    console.error(err)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      fieldErrors: null,
    }
  }

  return { success: true, message: null, fieldErrors: null }
}