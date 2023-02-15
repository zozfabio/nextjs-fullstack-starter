import { Button } from '@mui/material'

import { SecondaryActionProps } from './types'
import { shouldMountSecondaryAction } from './helpers'

const SecondaryAction = (props: SecondaryActionProps) => {
  const { secondaryActionLabel, secondaryActionOnClick, onClose } = props
  if (!shouldMountSecondaryAction(props)) {
    return null
  }
  return (
    <Button
      key="secondaryAction"
      variant="outlined"
      color="secondary"
      size="large"
      sx={{
        mr: 'auto',
        paddingLeft: '24px',
        paddingRight: '24px'
      }}
      onClick={(e) => {
        if (secondaryActionOnClick) {
          secondaryActionOnClick(e)
        } else {
          onClose && onClose(e, 'secondaryButtonClick')
        }
      }}
    >
      {secondaryActionLabel || 'Fechar'}
    </Button>
  )
}

export default SecondaryAction
