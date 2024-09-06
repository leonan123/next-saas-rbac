import { Header } from '@/_components/header'
import { Tabs } from '@/_components/tabs'

export default async function OrgLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col gap-4">
      <div className="pt-6">
        <Header />
        <Tabs />
      </div>

      <div className="mx-auto flex w-full max-w-screen-xl flex-1 flex-col">
        {children}
      </div>
    </div>
  )
}
