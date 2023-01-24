import { InputProps } from '../types'

export interface InputTextProps extends InputProps {
  allowNumber?: boolean
  defaultValue?: string
  onVerifyExternalValidation?: (value: string) => Promise<boolean>
}
