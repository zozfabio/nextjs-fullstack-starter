import { forwardRef, ForwardedRef } from 'react'

import MuiInput from '@mui/material/Input'

import { StyledRoot as Root, StyledInput as Input } from './styles'
import { InputBaseProps } from './types'

const InputBase = forwardRef(function InputBase(
  props: InputBaseProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const { rootRef, components, ...other } = props
  return (
    <MuiInput
      {...other}
      components={{
        Root,
        Input,
        ...components
      }}
      ref={rootRef}
      inputRef={ref}
    />
  )
})

export default InputBase
