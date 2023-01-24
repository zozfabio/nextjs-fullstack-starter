import React from 'react'

import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

import { useTranslate } from 'locale'

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
  const t = useTranslate(['common', 'components'])
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
          {closeConfirmationMessage ||
            t('modal.closeConfirmation.message', { ns: 'components' })}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ pb: 2, pt: 0, px: 3 }}>
        <SecondaryAction
          onClose={onClose}
          secondaryActionLabel={t('no', { ns: 'common' }) || 'No'}
        />
        <PrimaryAction
          primaryActionOnClick={onConfirm}
          primaryActionLabel={t('yes', { ns: 'common' }) || 'Yes'}
        />
      </DialogActions>
    </Dialog>
  )
}

export default CloseConfirmation
