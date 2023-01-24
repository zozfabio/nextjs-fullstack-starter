import React, { FunctionComponent, PropsWithChildren, useMemo } from 'react'
import { useRouter } from 'next/router'

import { NuvyRoutesContext, RoutesProviderProps } from './types'
import { Context } from './hooks'

export { useRoutesContext } from './hooks'
export type { Routers } from './types'

const RoutesProvider: FunctionComponent<
  PropsWithChildren<RoutesProviderProps>
> = ({ routes, children }) => {
  const { pathname } = useRouter()
  const ctx = useMemo(
    (): NuvyRoutesContext => routes[pathname],
    [pathname, routes]
  )
  return <Context.Provider value={ctx}>{children}</Context.Provider>
}

export default RoutesProvider
