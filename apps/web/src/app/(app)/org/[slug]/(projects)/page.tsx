import { Ban, CirclePlus } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/_components/ui/button'
import { ability, getCurrentOrg } from '@/auth/auth'

import { ProjectList } from './project-list'

export default async function Projects() {
  const permissions = await ability()
  const currentOrg = getCurrentOrg()

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>

        {permissions?.can('create', 'Project') && (
          <Button size="sm" asChild>
            <Link href={`/org/${currentOrg}/create-project`}>
              <CirclePlus className="mr-2 size-4" />
              New
            </Link>
          </Button>
        )}
      </div>

      {permissions?.can('get', 'Project') ? (
        <ProjectList />
      ) : (
        <div className="flex flex-1 items-center justify-center gap-4 text-lg text-muted-foreground">
          <Ban className="size-11" />
          <p>You are not allowed to see organization projects</p>
        </div>
      )}
    </div>
  )
}
