import React, { PropsWithChildren, FunctionComponent } from 'react'

import { InputGroupProviderProps } from './types'
import { Context } from './hooks'

const InputGroupProvider: FunctionComponent<
  PropsWithChildren<InputGroupProviderProps>
> = ({ registerField, children }) => {
  return (
    <Context.Provider value={{ registerField }}>{children}</Context.Provider>
  )
}

export default InputGroupProvider
export { useInputGroupContext, useInputGroupRegister } from './hooks'
