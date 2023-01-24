import { ForwardedRef } from 'react'

import { InputProps as MuiInputProps } from '@mui/material/Input'

export interface InputBaseProps extends MuiInputProps {
  rootRef?: ForwardedRef<HTMLDivElement>
}
