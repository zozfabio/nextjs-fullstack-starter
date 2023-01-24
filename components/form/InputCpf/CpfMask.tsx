import React, { forwardRef, ForwardRefRenderFunction, memo } from 'react'
import { IMaskInput } from 'react-imask'

import { CpfMaskProps } from './types'

const CpfMask: ForwardRefRenderFunction<HTMLElement, CpfMaskProps> = (
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
      mask="000.000.000-00"
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

export default memo(forwardRef(CpfMask))
