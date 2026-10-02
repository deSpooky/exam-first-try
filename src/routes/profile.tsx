import { createFileRoute, redirect } from '@tanstack/react-router'
import { getUserFn } from '#/lib/getUser'
import { logoutFn } from '#/lib/logout'
import { getEntries } from '#/lib/entries'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const Route = createFileRoute('/profile')({
    beforeLoad: async () => {
        const user = await getUserFn()

        if (!user) {
            throw redirect({to: "/login"})
        }

        return { user }
    },
    loader: async({context}) => {
        const username = context.user

        if (username === "admin1") {
            return await getEntries({data: {}})
        }

        return await getEntries({data: {username}})
    },
    component: ProfilePage,
})

function ProfilePage() {

    const { user } = Route.useRouteContext()
    const entries = Route.useLoaderData()
    const navigate = Route.useNavigate()

    async function handleClick() {
        await logoutFn()
        navigate({to: "/login"})
    }

    async function entriesClick() {
        await logoutFn()
        navigate({to: "/entries"})
    }

  return (
  <><div>
          Hello {user}!
          <button type="button" onClick={handleClick}>Выйти</button>
      </div>
      <Table>
              <TableHeader>
                  <TableRow>
                      <TableHead className="w-[100px]">Название курса</TableHead>
                      <TableHead>Способ оплаты</TableHead>
                      <TableHead>Дата начала</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((entry) => (
                  <TableRow key={entry.id}>
                      <TableCell className="font-medium">{entry.course.title}</TableCell>
                      <TableCell>{entry.payment.title}</TableCell>
                      <TableCell>{entry.startDate}</TableCell>
                  </TableRow>
                  ))}
              </TableBody>
        </Table>

    <button type="button" onClick={entriesClick}>Заявки</button>
        </>
  )
}