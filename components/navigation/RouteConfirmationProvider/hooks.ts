import { createContext, useContext } from 'react'

import { NuvyRouteConfirmationContext } from './types'

export const Context = createContext<NuvyRouteConfirmationContext>({
  setConfirmation: () => {
    //
  },
  confirm: () => {
    return Promise.reject()
  }
})

export function useNavigationConfirmationContext() {
  return useContext(Context)
}
