import type { Client } from '@/entities/client/model/types'
import { ClientCard } from './ClientCard'
import { EmptyState } from '@/shared/ui/EmptyState'

type ClientListProps = {
  clients: Client[]
  onDelete: (client: Client) => void
  onEdit: (client: Client) => void
  hasClients: boolean
}

export const ClientList = ({
  clients,
  onDelete,
  onEdit,
  hasClients,
}: ClientListProps) => {
  if (clients.length === 0) {
    return (
      <EmptyState
        title={hasClients ? 'Ничего не найдено' : 'Клиентов пока нет'}
        description={
          hasClients
            ? 'Попробуйте изменить поиск или фильтры.'
            : 'Создайте первого клиента, чтобы начать работу.'
        }
      />
    )
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="hidden md:sticky md:top-0 md:z-10 md:grid md:grid-cols-[1.4fr_1.8fr_1.2fr_0.7fr_1fr] md:items-center md:gap-4 md:border-b md:border-slate-200 md:bg-white md:px-4 md:py-3 md:text-xs md:font-medium md:uppercase md:tracking-wide md:text-slate-500">
        <div>Клиент</div>
        <div>Контакты</div>
        <div>Компания</div>
        <div>Статус</div>
        <div className="text-center">Действия</div>
      </div>

      {clients.map((client) => (
        <ClientCard
          key={client.id}
          client={client}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}
