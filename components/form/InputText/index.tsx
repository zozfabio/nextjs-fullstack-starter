import React, { FunctionComponent } from 'react'

import InputController from '../InputController'
import InputBase, { InputBaseProps } from '../InputBase'

const InputText: FunctionComponent<InputBaseProps> = ({ name, ...props }) => {
  return (
    <InputController
      name={name}
      render={({ field }) => <InputBase {...field} {...props} />}
    />
  )
}

export default InputText
