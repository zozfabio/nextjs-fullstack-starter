import { ModalCloseReason } from './types'

export const isReasonToCloseModal = (
  reason?: ModalCloseReason,
  closeOn?: ModalCloseReason[]
): boolean => {
  if (reason && closeOn && !closeOn.includes(reason)) {
    return false
  }
  return true
}
