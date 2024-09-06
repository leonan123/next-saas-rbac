'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Check, UserPlus2, X } from 'lucide-react'

import { getPendingInvites } from '@/http/get-pending-invites'

import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { acceptInviteAction, rejectInviteAction } from './actions'

dayjs.extend(relativeTime)

export function PendingInvites() {
  const { invalidateQueries } = useQueryClient()

  const { data } = useQuery({
    queryKey: ['pending-invites'],
    queryFn: getPendingInvites,
  })

  async function handleAcceptInvite(inviteId: string) {
    await acceptInviteAction(inviteId)

    invalidateQueries({ queryKey: ['pending-invites'] })
  }

  async function handleRejectInvite(inviteId: string) {
    await rejectInviteAction(inviteId)

    invalidateQueries({ queryKey: ['pending-invites'] })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost">
          <UserPlus2 className="size-4" />
          <span className="sr-only">Pending invites</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 space-y-2">
        <span className="block text-sm font-medium">
          Pending invites ({data?.invites.length ?? 0})
        </span>

        {data?.invites.length === 0 && (
          <p className="text-sm text-muted-foreground">No invites found.</p>
        )}

        {data?.invites.map((invite) => (
          <div className="space-y-2">
            <p className="text-sm leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground">
                {invite.author?.name ?? 'Someone'}
              </span>{' '}
              invited you to join{' '}
              <span className="font-medium text-foreground">
                {invite.organization?.name}
              </span>{' '}
              <span className="text-xs">
                {dayjs(invite.createdAt).fromNow()}
              </span>
            </p>

            <div className="flex gap-1">
              <Button
                size="xs"
                variant="outline"
                onClick={handleAcceptInvite.bind(null, invite.id)}
              >
                <Check className="mr-1.5 size-3" />
                Accept
              </Button>

              <Button
                size="xs"
                variant="ghost"
                className="text-muted-foreground"
                onClick={handleRejectInvite.bind(null, invite.id)}
              >
                <X className="mr-1.5 size-3" />
                Revoke
              </Button>
            </div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  )
}
