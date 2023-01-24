import { FunctionComponent } from 'react'

import { styled } from '@mui/material'
import Typography from '@mui/material/Typography'
import FormControl, { FormControlProps } from '@mui/material/FormControl'

import { LabelProps } from './types'

export const StyledFormControl = styled(FormControl)<FormControlProps>(
  ({ theme }) => ({
    '& .MuiInputBase-input[readonly]': {
      backgroundColor: theme.palette.grey[100]
    },
    '& .MuiInputBase-input[disabled]': {
      backgroundColor: theme.palette.grey[100]
    }
  })
)

export const StyledLabel: FunctionComponent<LabelProps> = ({
  children,
  forId,
  required,
  error
}) => {
  return (
    <Typography
      variant="body2"
      component="label"
      htmlFor={forId}
      color={error ? 'error' : 'grey.700'}
    >
      {children}
      <Typography
        variant="caption"
        color="error"
        fontSize={14}
        fontWeight={700}
        visibility={required ? 'visible' : 'hidden'}
        component="span"
      >
        {' '}
        *
      </Typography>
    </Typography>
  )
}
