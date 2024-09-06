import { redirect } from 'next/navigation'

import { ability, getCurrentOrg } from '@/auth/auth'

import { ProjectForm } from './project-form'

export default async function CreateProjectPage() {
  const permissions = await ability()
  const org = getCurrentOrg()

  if (permissions?.cannot('create', 'Project')) {
    redirect(`/org/${org}`)
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Create Project</h1>

      <ProjectForm />
    </div>
  )
}
