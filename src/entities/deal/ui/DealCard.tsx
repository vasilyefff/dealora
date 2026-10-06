import { useSelector } from 'react-redux'
import type { RootState } from '@/app/store'
import type { Deal } from '@/entities/deal/model/types'
import { dealStageLabels } from '@/entities/deal/lib/dealStageLabels'

import { Button } from '@/shared/ui/Button'
import { Badge } from '@/shared/ui/Badge'

type DealCardProps = {
  deal: Deal
  onEdit: (deal: Deal) => void
  onDelete: (id: string) => void
}

export const DealCard = ({ deal, onEdit, onDelete }: DealCardProps) => {
  const clients = useSelector((state: RootState) => state.clients.items)
  const client = clients.find((client) => client.id === deal.clientId)
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-base font-semibold text-slate-900">{deal.title}</h3>

      <div className="mt-2 flex items-center gap-6">
        <p className="text-sm text-slate-600">
          Клиент:{' '}
          <span className="font-medium text-slate-900">
            {client?.name || 'Клиент не найден'}
          </span>
        </p>

        <p className="text-sm text-slate-600">
          Сумма:{' '}
          <span className="font-medium text-slate-900">
            {new Intl.NumberFormat('ru-RU', {
              style: 'currency',
              currency: 'RUB',
              maximumFractionDigits: 0,
            }).format(deal.value)}
          </span>
        </p>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <span className="text-sm text-slate-600">Этап:</span>

        <Badge variant={deal.stage === 'lead' ? 'dealLead' : deal.stage}>
          {dealStageLabels[deal.stage]}
        </Badge>
      </div>

      <p className="mt-2 text-sm text-slate-600">
        Комментарий:{' '}
        <span className="text-slate-900">
          {deal.comment || 'Нет комментария'}
        </span>
      </p>

      <div className="mt-4 flex gap-2">
        <Button variant="secondary" type="button" onClick={() => onEdit(deal)}>
          Редактировать
        </Button>

        <Button
          variant="danger"
          type="button"
          onClick={() => onDelete(deal.id)}
        >
          Удалить
        </Button>
      </div>
    </div>
  )
}
