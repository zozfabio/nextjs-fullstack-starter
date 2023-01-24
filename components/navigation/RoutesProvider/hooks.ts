import { createContext, useContext } from 'react'

import { NuvyRoutesContext } from './types'

export const Context = createContext<NuvyRoutesContext>({})

export function useRoutesContext() {
  return useContext(Context)
}
