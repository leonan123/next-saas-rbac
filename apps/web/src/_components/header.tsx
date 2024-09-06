import { Slash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import rocketIcon from '@/assets/rocket.svg'
import { ability } from '@/auth/auth'

import { OrganizationSwitcher } from './organization-switcher'
import { PendingInvites } from './pending-invites'
import { ProfileButton } from './profile-button'
import { ProjectSwitcher } from './project-switcher'
import { ThemeSwitcher } from './theme/theme-switcher'
import { Separator } from './ui/separator'

export async function Header() {
  const permissions = await ability()

  return (
    <div className="mx-auto flex max-w-screen-xl items-center justify-between">
      <div className="flex items-center gap-3">
        <Link href="/">
          <Image src={rocketIcon} className="size-6 dark:invert" alt="rocket" />
        </Link>

        <Slash className="size-3 -rotate-[24deg] text-border" />

        <OrganizationSwitcher />

        {permissions?.can('get', 'Project') && (
          <>
            <Slash className="size-3 -rotate-[24deg] text-border" />

            <ProjectSwitcher />
          </>
        )}
      </div>

      <div className="flex items-center gap-4">
        <PendingInvites />
        <ThemeSwitcher />

        <Separator orientation="vertical" className="h-5" />

        <ProfileButton />
      </div>
    </div>
  )
}
