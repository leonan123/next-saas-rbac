'use client'

import { AlertTriangleIcon, Loader2Icon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Alert, AlertDescription, AlertTitle } from '@/_components/ui/alert'
import { Button } from '@/_components/ui/button'
import { Input } from '@/_components/ui/input'
import { Label } from '@/_components/ui/label'
import { Separator } from '@/_components/ui/separator'
import githubIcon from '@/assets/github-icon.svg'
import { useFormState } from '@/_hooks/use-form-state'

import { signInWithGithub } from '../actions'
import { signUpAction } from './action'

export default function SignUpForm() {
  const router = useRouter()

  const [{ success, message, fieldErrors }, handleSubmit, isPending] =
    useFormState(signUpAction, () => {
      router.push('/auth/sign-in')
    })

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {success === false && message && (
          <Alert variant="destructive">
            <AlertTriangleIcon className="size-4" />
            <AlertTitle>Sign up failed!</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input name="name" id="name" />

          {fieldErrors?.name && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {fieldErrors.name[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input name="email" type="email" id="email" />

          {fieldErrors?.email && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {fieldErrors.email[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input name="password" type="password" id="password" />

          {fieldErrors?.password && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {fieldErrors.password[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password_confirmation">Confirm your password</Label>
          <Input
            name="password_confirmation"
            type="password"
            id="password_confirmation"
          />

          {fieldErrors?.confirm_password && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {fieldErrors.confirm_password[0]}
            </p>
          )}
        </div>

        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? (
            <Loader2Icon size={16} className="animate-spin" />
          ) : (
            <span> Create account</span>
          )}
        </Button>

        <Button
          className="w-full"
          type="submit"
          variant="link"
          size="sm"
          asChild
        >
          <Link href="/auth/sign-in">Already registered? Sign in</Link>
        </Button>

        <Separator />
      </form>

      <form action={signInWithGithub}>
        <Button className="w-full" type="submit" variant="outline">
          <Image src={githubIcon} alt="" className="mr-2 size-4 dark:invert" />
          Sign up with Github
        </Button>
      </form>
    </div>
  )
}
