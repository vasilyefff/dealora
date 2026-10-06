import type { DealStage } from '@/entities/deal/model/types'

export const dealStageLabels: Record<DealStage, string> = {
  lead: 'Лид',
  proposal: 'Предложение',
  negotiation: 'Переговоры',
  won: 'Выиграна',
  lost: 'Проиграна',
}
