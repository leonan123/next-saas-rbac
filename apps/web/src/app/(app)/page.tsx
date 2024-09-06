import { Header } from '@/_components/header'

export default async function Home() {
  return (
    <div className="space-y-4 py-4">
      <Header />

      <main className="mx-auto w-full max-w-screen-xl">
        <h1 className="text-sm text-muted-foreground">
          Select an organization.
        </h1>
      </main>
    </div>
  )
}
