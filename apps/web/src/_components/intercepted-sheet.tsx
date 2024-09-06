'use client'

import * as SheetPrimitive from '@radix-ui/react-dialog'
import { useRouter } from 'next/navigation'
import React from 'react'

export function InterceptedSheet({ ...props }: SheetPrimitive.DialogProps) {
  const router = useRouter()

  function onDismiss() {
    router.back()
  }

  return (
    <SheetPrimitive.Root
      {...props}
      onOpenChange={(open) => !open && onDismiss()}
    />
  )
}
