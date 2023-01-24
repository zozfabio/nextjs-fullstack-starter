import { createContext, useContext, useEffect } from 'react'

import { InputGroupContext } from './types'

export const Context = createContext<InputGroupContext>({
  registerField: () => {
    //
  }
})

export function useInputGroupContext() {
  return useContext(Context)
}

export function useInputGroupRegister(field: string) {
  const ctx = useInputGroupContext()
  useEffect(() => {
    if (ctx) {
      ctx.registerField(field)
    }
  }, [field, ctx])
}
