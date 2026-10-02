import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/entries')({
  component: RouteComponent,
})

function RouteComponent() {

  return (
    <div className="page">
      <article>
        <div className="entries-admin">
          <h2>Заявки</h2>
          <select>
            <option value="null">Все курсы</option>
            <option value="Алгоритмы">Алгоритмы</option>
            <option value="Основы программирования">Основы программирования</option>
            <option value="СУБД">СУБД</option>
          </select>
          <select className="input input--filter">
            <option value="null">Все виды оплаты</option>
            <option value="Наличными">Наличными</option>
            <option value="Переводом">Переводом</option>
          </select>
        </div>

        <table>
          <thead>
            <tr>
              <th>Заявитель</th>
              <th>Курс</th>
              <th>Тип оплаты</th>
              <th>Дата начала</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </article>
    </div>
  )
}
