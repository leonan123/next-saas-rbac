'use client'

import { InterceptedSheet } from '@/_components/intercepted-sheet'
import { SheetContent, SheetHeader, SheetTitle } from '@/_components/ui/sheet'

import { OrganizationForm } from '../../org/organization-form'

export default function CreateOrganizationInterceptor() {
  return (
    <InterceptedSheet defaultOpen>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create organization</SheetTitle>
        </SheetHeader>

        <div className="mt-4">
          <OrganizationForm />
        </div>
      </SheetContent>
    </InterceptedSheet>
  )
}
