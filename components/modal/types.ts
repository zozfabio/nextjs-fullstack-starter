import { SyntheticEvent } from 'react'

export type ModalCloseReason =
  | 'backdropClick'
  | 'escapeKeyDown'
  | 'closeButtonClick'
  | 'secondaryButtonClick'
  | 'confirmButtonClick'

export type ModalOpenCallback<T> = (state?: T) => void

export type ModalCloseCallback = ((
  event?: SyntheticEvent | Record<string, never>,
  reason?: ModalCloseReason
) => void) & {
  closeOn?: ModalCloseReason[]
}

export interface UseModalProps {
  closeOn?: ModalCloseReason[]
}

export interface UseModalState<T> {
  isOpen: boolean
  state?: T
}
