import { forwardRef, ForwardRefRenderFunction, memo } from 'react'
import { IMaskInput } from 'react-imask'

import { CnpjMaskProps } from './types'

const CnpjMask: ForwardRefRenderFunction<HTMLElement, CnpjMaskProps> = (
  props,
  ref
) => {
  const { onChange, ...other } = props
  return (
    <IMaskInput
      {...other}
      inputRef={(inputRef) => {
        if (typeof ref === 'function') {
          ref(inputRef as HTMLElement)
        }
      }}
      mask="00.000.000/0000-00"
      definitions={{
        '#': /[0-9]/
      }}
      onAccept={(value: any) =>
        onChange({ target: { name: props.name, value } })
      }
      overwrite
    />
  )
}

export default memo(forwardRef(CnpjMask))
