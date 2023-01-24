import { InputProps } from '../types'

export interface InputPasswordState {
  value: string
  error: string
  visible: boolean
}

export type InputPasswordProps = Pick<
  InputProps,
  'name' | 'label' | 'placeholder' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
>
