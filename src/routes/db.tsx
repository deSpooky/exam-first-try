import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/db')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/db"!</div>
}
