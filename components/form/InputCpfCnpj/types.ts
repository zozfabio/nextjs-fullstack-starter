import { InputProps } from '../types'

export type InputCpfCnpjProps = InputProps & {
  defaultValue?: string
  onVerifyExternalValidation?: (value: string) => Promise<boolean>
}

export interface CnpjMaskProps {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}
