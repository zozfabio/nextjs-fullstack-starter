import { Button } from '@mui/material'

import { PrimaryActionProps } from './types'
import { shouldMountPrimaryAction } from './helpers'

const PrimaryAction = (props: PrimaryActionProps) => {
  const { primaryActionLabel, primaryActionOnClick, primaryActionDisabled } =
    props
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
      {primaryActionLabel || 'Confirmar'}
    </Button>
  )
}

export default PrimaryAction
