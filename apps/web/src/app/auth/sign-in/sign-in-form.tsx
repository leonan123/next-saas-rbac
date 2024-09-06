'use client'

import { AlertTriangleIcon, Loader2Icon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { Alert, AlertDescription, AlertTitle } from '@/_components/ui/alert'
import { Button } from '@/_components/ui/button'
import { Input } from '@/_components/ui/input'
import { Label } from '@/_components/ui/label'
import { Separator } from '@/_components/ui/separator'
import { useFormState } from '@/_hooks/use-form-state'
import githubIcon from '@/assets/github-icon.svg'

import { signInWithGithub } from '../actions'
import { signInWithEmailAndPassword } from './actions'

export function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [{ success, message, fieldErrors }, handleSubmit, isPending] =
    useFormState(signInWithEmailAndPassword, () => {
      router.push('/')
    })

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {success === false && message && (
          <Alert variant="destructive">
            <AlertTriangleIcon className="size-4" />
            <AlertTitle>Sign in failed!</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )}
        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input
            name="email"
            type="email"
            id="email"
            defaultValue={searchParams.get('email') ?? ''}
          />

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

          <Link
            href="/auth/forgot-password"
            className="text-xs font-medium text-foreground hover:underline"
          >
            Forgot your password ?
          </Link>
        </div>

        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? (
            <Loader2Icon size={16} className="animate-spin" />
          ) : (
            <span>Sign in with email</span>
          )}
        </Button>

        <Button
          className="w-full"
          type="submit"
          variant="link"
          size="sm"
          asChild
        >
          <Link href="/auth/sign-up">Create new account</Link>
        </Button>

        <Separator />
      </form>

      <form action={signInWithGithub}>
        <Button className="w-full" type="submit" variant="outline">
          <Image src={githubIcon} alt="" className="mr-2 size-4 dark:invert" />
          Sign in with Github
        </Button>
      </form>
    </div>
  )
}
