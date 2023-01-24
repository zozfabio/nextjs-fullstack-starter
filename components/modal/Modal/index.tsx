import React, {
  FunctionComponent,
  MouseEvent,
  SyntheticEvent,
  useCallback
} from 'react'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'

import { useModal } from '../hooks'
import { ModalCloseCallback, ModalCloseReason } from '../types'

import SecondaryAction from './SecondaryAction'
import PrimaryAction from './PrimaryAction'
import ModalTitle from './ModalTitle'
import CloseConfirmation from './CloseConfirmation'
import { ModalProps } from './types'
import { shouldMountPrimaryAction, shouldMountSecondaryAction } from './helpers'
import { isReasonToCloseModal } from '../helpers'

const Modal: FunctionComponent<ModalProps> = (props) => {
  const {
    id,
    contentText,
    contentSx,
    children,
    actions,
    actionsSx,
    paperSx,
    onClose,
    open,
    maxWidth,
    confirmOnClose
  } = props
  const [
    isCloseConfirmationOpen,
    openCloseConfirmation,
    closeCloseConfirmation
  ] = useModal({
    closeOn: ['secondaryButtonClick']
  })
  const handleClose: ModalCloseCallback = useCallback(
    (
      event?: SyntheticEvent | Record<string, never>,
      reason?: ModalCloseReason
    ) => {
      if (isReasonToCloseModal(reason, onClose?.closeOn)) {
        if (confirmOnClose) {
          openCloseConfirmation()
        } else {
          onClose && onClose(event, reason)
        }
      }
    },
    [confirmOnClose, openCloseConfirmation, onClose]
  )
  const onConfirm = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      closeCloseConfirmation()
      onClose && onClose(event, 'confirmButtonClick')
    },
    [onClose, closeCloseConfirmation]
  )
  return (
    <>
      <Dialog
        fullWidth
        maxWidth={maxWidth || 'md'}
        keepMounted={false}
        PaperProps={{
          sx: { p: 2, borderRadius: 2, ...paperSx }
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby={`${id}-title`}
        aria-describedby={contentText ? `${id}-description` : undefined}
      >
        <ModalTitle {...props} onClose={handleClose} />
        <DialogContent sx={contentSx}>
          {contentText && (
            <DialogContentText id={`${id}-description`}>
              {contentText}
            </DialogContentText>
          )}
          {children}
        </DialogContent>
        {(shouldMountSecondaryAction(props) ||
          actions ||
          shouldMountPrimaryAction(props)) && (
          <DialogActions sx={actionsSx}>
            <SecondaryAction {...props} onClose={handleClose} />
            {actions}
            <PrimaryAction {...props} />
          </DialogActions>
        )}
      </Dialog>
      <CloseConfirmation
        {...props}
        open={isCloseConfirmationOpen}
        onClose={closeCloseConfirmation}
        onConfirm={onConfirm}
      />
    </>
  )
}

Modal.defaultProps = {
  confirmOnClose: false
}

export default Modal
