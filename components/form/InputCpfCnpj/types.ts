import { InputProps } from '../types'

export type InputCpfCnpjProps = InputProps

export interface CnpjMaskProps {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}
