'use client'

import { AlertTriangleIcon, Loader2Icon } from 'lucide-react'
import { useParams } from 'next/navigation'

import { Alert, AlertDescription, AlertTitle } from '@/_components/ui/alert'
import { Button } from '@/_components/ui/button'
import { Input } from '@/_components/ui/input'
import { Label } from '@/_components/ui/label'
import { Textarea } from '@/_components/ui/textarea'
import { useFormState } from '@/_hooks/use-form-state'
import { queryClient } from '@/lib/react-query'

import { createProjectAction } from './action'

export function ProjectForm() {
  const { slug: orgSlug } = useParams<{ slug: string }>()

  const [{ success, message, fieldErrors }, handleSubmit, isPending] =
    useFormState(createProjectAction, () => {
      queryClient.invalidateQueries({
        queryKey: [orgSlug, 'projects'],
      })
    })

  return (
    <form onSubmit={handleSubmit} className="group space-y-4">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangleIcon className="size-4" />
          <AlertTitle>Create project failed!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      {success === true && message && (
        <Alert variant="success">
          <AlertTriangleIcon className="size-4" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-1">
        <Label htmlFor="name">Project name</Label>
        <Input name="name" id="name" />

        {fieldErrors?.name && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {fieldErrors.name[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="description">Description</Label>
        <Textarea name="description" id="description" />

        {fieldErrors?.description && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {fieldErrors.description[0]}
          </p>
        )}
      </div>

      <Button size="sm" type="submit" className="w-28">
        {isPending ? (
          <Loader2Icon size={16} className="animate-spin" />
        ) : (
          <span>Save project</span>
        )}
      </Button>
    </form>
  )
}
