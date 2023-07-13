import React, { FunctionComponent } from 'react'

// eslint-disable-next-line no-restricted-imports
import { Controller, ControllerProps } from 'react-hook-form'

import { useForm } from '../Form'
import { useInputGroupRegister } from '../InputGroupProvider'

const InputController: FunctionComponent<ControllerProps> = ({
  name,
  ...props
}) => {
  const [control] = useForm((form) => form.control)

  useInputGroupRegister(name)

  return <Controller name={name} control={control} defaultValue="" {...props} />
}

export default InputController
