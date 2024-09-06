'use client'

import { type Role, roleSchema } from '@saas/auth'
import type { ComponentProps } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/_components/ui/select'

import { updateMemberAction } from './actions'

interface UpdateMemberRoleSelectProps extends ComponentProps<typeof Select> {
  memberId: string
}

export function UpdateMemberRoleSelect({
  memberId,
  ...props
}: UpdateMemberRoleSelectProps) {
  const rolesList = roleSchema.options.map((option) => option.value)

  async function updateMemberRole(role: Role) {
    await updateMemberAction(memberId, role)
  }

  return (
    <Select {...props} onValueChange={updateMemberRole}>
      <SelectTrigger className="h-8 w-32">
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
  )
}
