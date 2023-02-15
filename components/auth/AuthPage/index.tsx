import { FunctionComponent, PropsWithChildren } from 'react'

import { useSession } from 'next-auth/react'

const AuthPage: FunctionComponent<PropsWithChildren<any>> = ({ children }) => {
  const { status } = useSession({ required: true })
  if (status === 'loading') {
    return <div>Loading...</div>
  }
  return children
}

export default AuthPage
