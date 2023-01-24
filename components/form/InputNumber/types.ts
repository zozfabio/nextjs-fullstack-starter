import { ReactNode } from 'react'

import { InputProps } from '../types'

export interface InputNumberProps extends InputProps {
  allowNegative?: boolean
  decimalSize?: number
  decimalSeparator?: string
  thousandSeparator?: string
  startAdornment?: ReactNode
}
