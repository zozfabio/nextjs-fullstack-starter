import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText
} from '@mui/material'

import ModalTitle from './ModalTitle'
import PrimaryAction from './PrimaryAction'
import SecondaryAction from './SecondaryAction'

import { CloseConfirmationProps } from './types'

const CloseConfirmation = ({
  id,
  open,
  title,
  confirmOnClose,
  closeConfirmationMessage,
  onConfirm,
  onClose
}: CloseConfirmationProps) => {
  if (!confirmOnClose) {
    return <></>
  }
  const myId = `${id}-close-confirmation`
  return (
    <Dialog
      fullWidth
      maxWidth={'sm'}
      keepMounted={false}
      PaperProps={{
        sx: { p: 2, borderRadius: 2 }
      }}
      open={open}
      onClose={onClose}
      aria-labelledby={`${myId}-title`}
      aria-describedby={`${myId}-description`}
    >
      <ModalTitle id={myId} title={title} disableCloseButton />
      <DialogContent sx={{ p: 3 }}>
        <DialogContentText id={`${myId}-description`}>
          {closeConfirmationMessage || 'Deseja fechar?'}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ pb: 2, pt: 0, px: 3 }}>
        <SecondaryAction onClose={onClose} secondaryActionLabel={'Não'} />
        <PrimaryAction
          primaryActionOnClick={onConfirm}
          primaryActionLabel={'Sim'}
        />
      </DialogActions>
    </Dialog>
  )
}

export default CloseConfirmation
