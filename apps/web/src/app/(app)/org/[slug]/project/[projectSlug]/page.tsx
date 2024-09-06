interface ProjectPageProps {
  projectSlug: string
}

export default function ProjectPage({ projectSlug }: ProjectPageProps) {
  return (
    <>
      <h1 className="text-3xl font-bold">Project</h1>
      <p>{projectSlug}</p>
    </>
  )
}
