import { ForwardedRef, forwardRef } from 'react'
import TextField, { TextFieldProps } from '@mui/material/TextField'

export type InputBaseProps = TextFieldProps & {
  name: string
}

const InputBase = forwardRef(function InputBase(
  props: InputBaseProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  return <TextField {...props} ref={ref} />
})

InputBase.defaultProps = {
  fullWidth: true
}

export default InputBase
