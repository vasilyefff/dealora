import { DealCard } from './DealCard'
import { EmptyState } from '@/shared/ui/EmptyState'
import type { Deal } from '@/entities/deal/model/types'

type DealListProps = {
  deals: Deal[]
  onEdit: (deal: Deal) => void
  onDelete: (id: string) => void
  hasDeals: boolean
}

export const DealList = ({
  deals,
  onEdit,
  onDelete,
  hasDeals,
}: DealListProps) => {
  if (deals.length === 0) {
    return (
      <EmptyState
        title={hasDeals ? 'Ничего не найдено' : 'Сделок пока нет'}
        description={
          hasDeals
            ? 'Попробуйте изменить фильтр по этапу.'
            : 'Создайте первую сделку, чтобы начать работу.'
        }
      />
    )
  }

  return (
    <div className="space-y-3 px-3 py-3">
      {deals.map((deal) => (
        <DealCard
          key={deal.id}
          deal={deal}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
