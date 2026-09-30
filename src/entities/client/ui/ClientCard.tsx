import { Link } from 'react-router-dom'
import type { Client } from '@/entities/client/model/types'
import { Badge } from '@/shared/ui/Badge'
import { Button } from '@/shared/ui/Button'

type ClientCardProps = {
  client: Client
  onDelete: (client: Client) => void
  onEdit: (client: Client) => void
}

const statusLabels: Record<Client['status'], string> = {
  lead: 'Лид',
  active: 'Активный',
  inactive: 'Неактивный',
}

export const ClientCard = ({ client, onDelete, onEdit }: ClientCardProps) => {
  return (
    <div className="border-b border-slate-200 px-4 py-4 md:grid md:grid-cols-[1.4fr_1.8fr_1.2fr_0.7fr_1fr] md:items-center md:gap-4">
      <div className="mb-3 flex items-center gap-3 md:mb-0 md:block">
        <p className="font-medium text-slate-900">{client.name}</p>

        <div className="ml-auto shrink-0 md:hidden">
          <Badge variant={client.status}>{statusLabels[client.status]}</Badge>
        </div>
      </div>

      <div className="mb-3 text-sm text-slate-500 md:mb-0">
        <p>{client.email}</p>
        <p>{client.phone}</p>
      </div>

      <div className="mb-3 text-sm text-slate-700 md:mb-0">
        {client.company}
      </div>

      <div className="hidden md:flex">
        <Badge variant={client.status}>{statusLabels[client.status]}</Badge>
      </div>
      <div className="grid grid-cols-3 gap-2 md:flex md:flex-col md:items-center">
        <Link
          to={`/clients/${client.id}`}
          className="flex w-full items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-700 md:w-24"
        >
          Подробнее
        </Link>

        <Button
          variant="secondary"
          className="w-full md:w-24"
          onClick={() => onEdit(client)}
        >
          Изменить
        </Button>

        <Button
          variant="danger"
          className="w-full md:w-24"
          onClick={() => onDelete(client)}
        >
          Удалить
        </Button>
      </div>
    </div>
  )
}
