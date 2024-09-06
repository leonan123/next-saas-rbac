import { Header } from '@/_components/header'

import { OrganizationForm } from '../org/organization-form'

export default function CreateOrganizationPage() {
  return (
    <div className="space-y-4 py-4">
      <Header />

      <main className="mx-auto w-full max-w-screen-xl">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Create organization</h1>

          <OrganizationForm />
        </div>
      </main>
    </div>
  )
}
