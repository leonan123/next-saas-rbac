'use client'

import { AlertTriangleIcon, Loader2Icon } from 'lucide-react'
import { useRef } from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/_components/ui/alert'
import { Button } from '@/_components/ui/button'
import { Checkbox } from '@/_components/ui/checkbox'
import { Input } from '@/_components/ui/input'
import { Label } from '@/_components/ui/label'
import { useFormState } from '@/_hooks/use-form-state'

import {
  createOrganizationAction,
  type TOrganizationSchema,
  updateOrganizationAction,
} from './actions'

interface OrganizationFormProps {
  isUpdating?: boolean
  initialData?: TOrganizationSchema
}

export function OrganizationForm({
  isUpdating = false,
  initialData,
}: OrganizationFormProps) {
  const formRef = useRef<HTMLFormElement | null>(null)

  const formAction = isUpdating
    ? updateOrganizationAction
    : createOrganizationAction

  const [{ success, message, fieldErrors }, handleSubmit, isPending] =
    useFormState(formAction, () => {
      formRef.current?.reset()
    })

  return (
    <form onSubmit={handleSubmit} ref={formRef} className="space-y-4">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangleIcon className="size-4" />
          <AlertTitle>
            {isUpdating ? 'Update' : 'Create'} organization failed!
          </AlertTitle>
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
        <Label htmlFor="name">Organization name</Label>
        <Input name="name" id="name" defaultValue={initialData?.name} />

        {fieldErrors?.name && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {fieldErrors.name[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="domain">E-mail domain</Label>
        <Input
          name="domain"
          type="text"
          id="domain"
          inputMode="url"
          placeholder="example.com"
          defaultValue={initialData?.domain || undefined}
        />

        {fieldErrors?.domain && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {fieldErrors.domain[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <div className="flex items-baseline space-x-2">
          <Checkbox
            className="translate-y-0.5"
            name="shouldAttachUsersByDomain"
            id="shouldAttachUsersByDomain"
            defaultChecked={initialData?.shouldAttachUsersByDomain}
          />

          <label htmlFor="shouldAttachUsersByDomain" className="space-y-1">
            <span className="text-sm font-medium leading-none">
              Auto-join new members
            </span>

            <p className="text-sm text-muted-foreground">
              This will automatically invite all members with same e-mail domain
              to this organization.
            </p>
          </label>
        </div>
      </div>

      <Button className="w-full" type="submit" disabled={isPending}>
        {isPending ? (
          <Loader2Icon size={16} className="animate-spin" />
        ) : (
          <span>Save organization</span>
        )}
      </Button>
    </form>
  )
}
