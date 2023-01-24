import { FunctionComponent, PropsWithChildren, useEffect } from 'react'

import { getTemp } from 'api/temp'

// eslint-disable-next-line no-restricted-imports
import { useSession } from 'next-auth/react'

const AuthPage: FunctionComponent<PropsWithChildren<any>> = ({ children }) => {
  const { status } = useSession({ required: true })

  useEffect(() => {
    const interval = setInterval(() => {
      getTemp()
    }, 5 * 60 * 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  if (status === 'loading') {
    return <div>Loading...</div>
  }
  return children
}

export default AuthPage
