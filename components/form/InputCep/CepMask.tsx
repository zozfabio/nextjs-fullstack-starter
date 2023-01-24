import { forwardRef, ForwardRefRenderFunction, memo } from 'react'
import { IMaskInput } from 'react-imask'

import { CepMaskProps } from './types'

const CepMask: ForwardRefRenderFunction<HTMLElement, CepMaskProps> = (
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
      mask="00000-000"
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

export default memo(forwardRef(CepMask))
