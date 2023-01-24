import { InputProps } from '../types'

export type InputCpfProps = InputProps

export interface CpfMaskProps {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}
