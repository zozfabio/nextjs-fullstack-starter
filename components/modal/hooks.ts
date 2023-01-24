import { useState, useCallback } from 'react'

import { isReasonToCloseModal } from './helpers'
import {
  ModalOpenCallback,
  ModalCloseCallback,
  UseModalProps,
  UseModalState
} from './types'

export function useModal<T>(
  props?: UseModalProps
): [boolean, ModalOpenCallback<T>, ModalCloseCallback, T | undefined] {
  const [state, setState] = useState<UseModalState<T>>({ isOpen: false })
  const open = useCallback((state?: T) => {
    setState({ isOpen: true, state })
  }, [])
  const close: ModalCloseCallback = useCallback(
    (_, reason) => {
      if (isReasonToCloseModal(reason, props?.closeOn)) {
        setState({ isOpen: false })
      }
    },
    [props]
  )
  close.closeOn = props?.closeOn
  return [state.isOpen, open, close, state.state]
}
