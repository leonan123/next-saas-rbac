'use client'

import { InterceptedSheet } from '@/_components/intercepted-sheet'
import { SheetContent, SheetHeader, SheetTitle } from '@/_components/ui/sheet'
import { ProjectForm } from '@/app/(app)/org/[slug]/create-project/project-form'

export default function CreateProjectInterceptor() {
  return (
    <InterceptedSheet defaultOpen>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Project</SheetTitle>
        </SheetHeader>

        <div className="mt-4">
          <ProjectForm />
        </div>
      </SheetContent>
    </InterceptedSheet>
  )
}
