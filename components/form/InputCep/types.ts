import { InputProps } from '../types'

export type InputCepProps = InputProps

export interface CepMaskProps {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}
