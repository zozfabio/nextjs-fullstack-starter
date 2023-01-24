import { ReactNode } from 'react'
import { DialogProps, SxProps, ButtonProps } from '@mui/material'

import { ModalCloseCallback } from '../types'

type HasDialogProps = Pick<DialogProps, 'open' | 'children' | 'maxWidth'>

interface CloseableProps {
  onClose?: ModalCloseCallback
}

interface HasModalTitleProps {
  id: string
  title: string
  titleSx?: SxProps
  disableCloseButton?: boolean
}

interface HasSecondaryActionProps {
  secondaryActionLabel?: string
  secondaryActionOnClick?: ButtonProps['onClick']
  disableSecondaryAction?: boolean
}

interface HasPrimaryActionProps {
  primaryActionLabel?: string
  primaryActionOnClick: ButtonProps['onClick']
  primaryActionDisabled?: boolean
}

interface HasCloseConfirmationProps
  extends Pick<DialogProps, 'open'>,
    Pick<HasModalTitleProps, 'id' | 'title'> {
  confirmOnClose?: boolean
  closeConfirmationMessage?: string
}

export type ModalTitleProps = HasModalTitleProps & CloseableProps
export type PrimaryActionProps = HasPrimaryActionProps
export type SecondaryActionProps = HasSecondaryActionProps & CloseableProps
export type CloseConfirmationProps = HasCloseConfirmationProps &
  CloseableProps & {
    onConfirm: HasPrimaryActionProps['primaryActionOnClick']
  }
export interface ModalProps
  extends HasModalTitleProps,
    HasPrimaryActionProps,
    HasSecondaryActionProps,
    HasDialogProps,
    CloseableProps,
    HasCloseConfirmationProps {
  contentText?: string
  contentSx?: SxProps
  actions?: ReactNode[]
  actionsSx?: SxProps
  paperSx?: SxProps
}
