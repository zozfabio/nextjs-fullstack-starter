import React from 'react'

import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'

import CloseIcon from '@mui/icons-material/Close'

import { ModalTitleProps } from './types'

const ModalTitle = (props: ModalTitleProps) => {
  const { id, title, titleSx, onClose, disableCloseButton } = props
  return (
    <Typography
      variant="h4"
      component={DialogTitle}
      id={`${id}-title`}
      sx={titleSx}
    >
      {disableCloseButton ? (
        title
      ) : (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
        >
          {title}
          <IconButton
            onClick={(e) => onClose && onClose(e, 'closeButtonClick')}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
      )}
    </Typography>
  )
}

export default ModalTitle
