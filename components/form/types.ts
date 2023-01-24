import { ReactNode, PropsWithChildren } from 'react'

import { GridProps } from '@mui/material/Grid'

export interface InputProps
  extends Pick<GridProps, 'xs' | 'sm' | 'md' | 'lg' | 'xl'> {
  name: string
  label?: string
  required?: boolean
  disabled?: boolean
  readOnly?: boolean
  autoFocus?: boolean
  placeholder?: string
  maxLength?: number
  helpText?: string
  tooltipInfo?: string | ReactNode
}

export interface LabelProps extends PropsWithChildren {
  forId: string
  required: boolean
  error: boolean
}
