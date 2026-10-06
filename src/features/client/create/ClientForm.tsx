import { useState } from 'react'

import { Input } from '@/shared/ui/Input'
import { Button } from '@/shared/ui/Button'
import { Select } from '@/shared/ui/Select'

import type {
  ClientStatus,
  CreateClientDto,
  UpdateClientDto,
} from '@/entities/client/model/types'

type CreateClientFormProps = {
  onSubmit: (data: CreateClientDto) => void | Promise<void>
  onCancel?: () => void
  initialData?: CreateClientDto
  isEdit?: false
  embedded?: boolean
}

type EditClientFormProps = {
  onSubmit: (data: UpdateClientDto) => void | Promise<void>
  onCancel?: () => void
  initialData?: UpdateClientDto
  isEdit: true
  embedded?: boolean
}

type Props = CreateClientFormProps | EditClientFormProps

export const ClientForm = (props: Props) => {
  const { onSubmit, initialData, isEdit, onCancel, embedded } = props
  const [name, setName] = useState(initialData?.name || '')
  const [email, setEmail] = useState(initialData?.email || '')
  const [phone, setPhone] = useState(initialData?.phone || '')
  const [company, setCompany] = useState(initialData?.company || '')
  const [status, setStatus] = useState<ClientStatus>(
    initialData?.status || 'lead',
  )
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!name.trim() || !email.includes('@')) {
      setError('Проверьте имя и адрес электронной почты')
      return
    }
    const formData: CreateClientDto = {
      name,
      email,
      phone,
      company,
      status,
    }

    await onSubmit(formData)

    if (!isEdit) {
      setName('')
      setEmail('')
      setPhone('')
      setCompany('')
      setStatus('lead')
    }
  }

  return (
    <div
      className={
        isEdit || embedded
          ? 'w-full space-y-4'
          : 'w-full max-w-md space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm'
      }
    >
      <h3 className="text-lg font-semibold text-slate-900">
        {isEdit ? 'Редактировать клиента' : 'Добавить клиента'}
      </h3>

      <div className="space-y-1.5">
        <label
          htmlFor="client-name"
          className="text-sm font-medium text-slate-700"
        >
          Имя
        </label>
        <Input
          id="client-name"
          className="w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Имя"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="client-email"
          className="text-sm font-medium text-slate-700"
        >
          Email
        </label>
        <Input
          id="client-email"
          className="w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="client-phone"
          className="text-sm font-medium text-slate-700"
        >
          Телефон
        </label>
        <Input
          id="client-phone"
          className="w-full"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Телефон"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="client-company"
          className="text-sm font-medium text-slate-700"
        >
          Компания
        </label>
        <Input
          id="client-company"
          className="w-full"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Компания"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="client-status"
          className="text-sm font-medium text-slate-700"
        >
          Статус
        </label>
        <Select
          id="client-status"
          className="w-full"
          value={status}
          onChange={(e) => setStatus(e.target.value as ClientStatus)}
        >
          <option value="lead">Лид</option>
          <option value="active">Активный</option>
          <option value="inactive">Неактивный</option>
        </Select>
      </div>

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}

      {isEdit ? (
        <div className="flex flex-col gap-3">
          <Button onClick={handleSubmit}>Сохранить</Button>

          <Button variant="secondary" onClick={onCancel}>
            Отмена
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <Button onClick={handleSubmit}>Добавить клиента</Button>

          {onCancel && (
            <Button variant="secondary" onClick={onCancel}>
              Отмена
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
