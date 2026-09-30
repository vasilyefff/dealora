import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/app/store'

import { fetchClients } from '@/entities/client/model/clientSlice'
import { fetchDeals } from '@/entities/deal/model/dealSlice'

import { Badge } from '@/shared/ui/Badge'
import { EmptyState } from '@/shared/ui/EmptyState'

export const ClientDetailsPage = () => {
  const { clientId } = useParams()
  const dispatch = useDispatch<AppDispatch>()

  const clients = useSelector((state: RootState) => state.clients.items)
  const fetchStatus = useSelector(
    (state: RootState) => state.clients.fetchStatus,
  )
  const error = useSelector((state: RootState) => state.clients.error)
  const client = clients.find((client) => client.id === clientId)

  const deals = useSelector((state: RootState) => state.deals.items)
  const clientDeals = deals.filter((deal) => deal.clientId === clientId)

  const statusLabels = {
    lead: 'Лид',
    active: 'Активный',
    inactive: 'Неактивный',
  }

  const dealStageLabels = {
    lead: 'Лид',
    proposal: 'Предложение',
    negotiation: 'Переговоры',
    won: 'Выиграна',
    lost: 'Проиграна',
  }

  const getDealsLabel = (count: number) => {
    const mod10 = count % 10
    const mod100 = count % 100

    if (mod10 === 1 && mod100 !== 11) {
      return 'сделка связана'
    }

    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
      return 'сделки связаны'
    }

    return 'сделок связано'
  }

  const currencyFormatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  })

  useEffect(() => {
    dispatch(fetchClients())
    dispatch(fetchDeals())
  }, [dispatch])

  if (fetchStatus === 'loading' || fetchStatus === 'idle') {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-500 shadow-sm">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
        <p>Загрузка клиента...</p>
      </div>
    )
  }

  if (fetchStatus === 'failed') {
    return (
      <div
        role="alert"
        className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
      >
        <p className="font-medium text-red-800">Что-то пошло не так</p>
        <p className="mt-1">{error}</p>
      </div>
    )
  }

  if (!client) {
    return (
      <EmptyState
        title="Клиент не найден"
        description="Клиент, которого вы ищете, не существует."
      />
    )
  }

  return (
    <div className="space-y-6">
      <Link
        to="/clients"
        className="inline-flex text-sm font-medium text-slate-500 transition hover:text-slate-900"
      >
        ← Назад к клиентам
      </Link>
      <div className="flex items-start gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            {client.name}
          </h1>

          <p className="mt-1 text-sm text-slate-500">Информация о клиенте</p>
        </div>

        <Badge variant={client.status}>{statusLabels[client.status]}</Badge>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">
          Информация о клиенте
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500">Email</p>
            <p className="mt-1 font-medium text-slate-900">{client.email}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Телефон</p>
            <p className="mt-1 font-medium text-slate-900">{client.phone}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Компания</p>
            <p className="mt-1 font-medium text-slate-900">{client.company}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Создан</p>
            <p className="mt-1 font-medium text-slate-900">
              {new Date(client.createdAt).toLocaleDateString('ru-RU')}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-base font-semibold text-slate-900">
          Связанные сделки
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {clientDeals.length} {getDealsLabel(clientDeals.length)} с этим
          клиентом
        </p>
      </div>

      {clientDeals.length === 0 ? (
        <p className="text-sm text-slate-500">
          У этого клиента пока нет сделок.
        </p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {clientDeals.map((deal) => (
            <div
              key={deal.id}
              className="border-b border-slate-100 p-4 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <p className="font-medium text-slate-900">{deal.title}</p>

                <Badge
                  variant={deal.stage === 'lead' ? 'dealLead' : deal.stage}
                >
                  {dealStageLabels[deal.stage]}
                </Badge>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Сумма: {currencyFormatter.format(deal.value)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
