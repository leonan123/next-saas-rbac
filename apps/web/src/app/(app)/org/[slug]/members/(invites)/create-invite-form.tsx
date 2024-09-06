'use client'

import { roleSchema } from '@saas/auth'
import { AlertTriangleIcon, Loader2Icon, UserPlus } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/_components/ui/alert'
import { Button } from '@/_components/ui/button'
import { Input } from '@/_components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/_components/ui/select'
import { useFormState } from '@/_hooks/use-form-state'

import { createInviteAction } from '../actions'

export function CreateInviteForm() {
  const [{ success, message, fieldErrors }, handleSubmit, isPending] =
    useFormState(createInviteAction)

  const rolesList = roleSchema.options.map((option) => option.value)

  return (
    <form onSubmit={handleSubmit} className="group space-y-4">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangleIcon className="size-4" />
          <AlertTitle>Invite failed!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex items-center gap-2">
        <div className="flex-1 space-y-1">
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="jhon@example.com"
          />

          {fieldErrors?.name && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {fieldErrors.name[0]}
            </p>
          )}
        </div>

        <Select
          name="role"
          defaultValue={rolesList.find((role) => role === 'MEMBER')}
        >
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {rolesList.map((role) => (
              <SelectItem
                key={role}
                className="capitalize"
                value={role.toUpperCase()}
              >
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button size="sm" type="submit" className="w-28">
          {isPending ? (
            <Loader2Icon size={16} className="animate-spin" />
          ) : (
            <>
              <UserPlus className="mr-2 size-4" />
              <span>Invite user</span>
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
