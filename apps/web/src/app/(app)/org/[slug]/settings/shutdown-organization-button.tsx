import { PowerOff } from 'lucide-react'
import { redirect } from 'next/navigation'

import { Button } from '@/_components/ui/button'
import { getCurrentOrg } from '@/auth/auth'
import { shutdownOrganization } from '@/http/shutdown-organization'

export function ShutdownOrganizationButton() {
  async function shutdownOrganizationAction() {
    'use server'

    const currentOrg = getCurrentOrg()

    await shutdownOrganization({ orgSlug: currentOrg! })

    redirect('/')
  }

  return (
    <form action={shutdownOrganizationAction}>
      <Button variant="destructive" className="w-56" type="submit">
        <PowerOff className="mr-2 size-4" />
        Shutdown organization
      </Button>
    </form>
  )
}
