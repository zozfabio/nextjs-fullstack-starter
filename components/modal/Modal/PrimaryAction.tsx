import React, { memo } from 'react'

import Button from '@mui/material/Button'

import { useTranslate } from 'locale'

import { PrimaryActionProps } from './types'
import { shouldMountPrimaryAction } from './helpers'

const PrimaryAction = (props: PrimaryActionProps) => {
  const { primaryActionLabel, primaryActionOnClick, primaryActionDisabled } =
    props
  const t = useTranslate('common')
  if (!shouldMountPrimaryAction(props)) {
    return null
  }
  return (
    <Button
      key="confirm"
      variant="contained"
      color="secondary"
      size="large"
      sx={{
        paddingLeft: '24px',
        paddingRight: '24px'
      }}
      onClick={primaryActionOnClick}
      disabled={primaryActionDisabled}
    >
      {primaryActionLabel || t('confirm')}
    </Button>
  )
}

export default memo(PrimaryAction)
