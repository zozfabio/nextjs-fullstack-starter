import { InputProps } from '../types'

export interface InputUsernameState {
  error: string
  value: string
}

export type InputUsernameProps = Pick<
  InputProps,
  | 'name'
  | 'label'
  | 'placeholder'
  | 'autoFocus'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
>
