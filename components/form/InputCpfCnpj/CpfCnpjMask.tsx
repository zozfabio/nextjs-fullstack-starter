import React, { forwardRef, ForwardRefRenderFunction } from 'react'
import { IMaskInput } from 'react-imask'

import { CnpjMaskProps } from './types'

const CpfCnpjMask: ForwardRefRenderFunction<HTMLElement, CnpjMaskProps> = (
  props,
  ref
) => {
  const { onChange, ...other } = props

  const masks = [
    {
      mask: '000.000.000-00',
      overwrite: true
    },
    {
      mask: '00.000.000/0000-00',
      overwrite: true
    }
  ]

  return (
    <IMaskInput
      {...other}
      mask={masks}
      inputRef={(inputRef) => {
        if (typeof ref === 'function') {
          ref(inputRef as HTMLElement)
        }
      }}
      definitions={{
        '#': /[0-9]/
      }}
      onAccept={(value: any) =>
        onChange({ target: { name: props.name, value } })
      }
    />
  )
}

export default forwardRef(CpfCnpjMask)
