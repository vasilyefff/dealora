import type { Client } from '@/entities/client/model/types'
import { Modal } from '@/shared/ui/Modal'
import { Button } from '@/shared/ui/Button'

type Props = {
  isOpen: boolean
  client: Client | null
  onConfirm: () => void
  onCancel: () => void
}

export const DeleteClientDialog = ({
  isOpen,
  client,
  onConfirm,
  onCancel,
}: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-900">
            Удалить клиента?
          </h3>

          <p className="text-sm leading-6 text-slate-500">
            {client?.name
              ? `Вы уверены, что хотите удалить клиента ${client.name}?`
              : 'Вы уверены?'}
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Отмена
          </Button>

          <Button type="button" variant="danger" onClick={onConfirm}>
            Удалить
          </Button>
        </div>
      </div>
    </Modal>
  )
}
