import { Frown } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/_components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/_components/ui/table'
import { ability, getCurrentOrg } from '@/auth/auth'
import { getInvites } from '@/http/get-invites'

import { CreateInviteForm } from './create-invite-form'
import { RevokeInviteButton } from './revoke-invite-button'

export async function Invites() {
  const currentOrg = getCurrentOrg()!
  const permissions = await ability()
  const { invites } = await getInvites(currentOrg)

  return (
    <div className="space-y-4">
      {permissions?.can('create', 'Invite') && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Invite member</CardTitle>
          </CardHeader>

          <CardContent>
            <CreateInviteForm />
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Invites</h2>

        <div className="rounded border">
          <Table>
            <TableBody>
              {invites.map((invite) => (
                <TableRow key={invite.id}>
                  <TableCell className="py-2.5">
                    <span className="text-muted-foreground">
                      {invite.email}
                    </span>
                  </TableCell>

                  <TableCell className="py-2.5 font-medium">
                    {invite.role}
                  </TableCell>

                  <TableCell className="py-2.5">
                    <div className="flex justify-end">
                      {permissions?.can('delete', 'Invite') && (
                        <RevokeInviteButton inviteId={invite.id} />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {invites.length === 0 && (
                <TableRow>
                  <TableCell>
                    <div className="inline-flex w-full items-center justify-center text-muted-foreground">
                      <Frown className="mr-2 size-4" />
                      No invites found
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
