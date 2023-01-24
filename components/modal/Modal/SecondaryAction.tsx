import Button from '@mui/material/Button'

import { useTranslate } from 'locale'

import { SecondaryActionProps } from './types'
import { shouldMountSecondaryAction } from './helpers'

const SecondaryAction = (props: SecondaryActionProps) => {
  const { secondaryActionLabel, secondaryActionOnClick, onClose } = props
  const t = useTranslate('common')
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
      {secondaryActionLabel || t('close')}
    </Button>
  )
}

export default SecondaryAction
