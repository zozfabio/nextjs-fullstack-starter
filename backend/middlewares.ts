import { NextApiHandler } from 'next'

// eslint-disable-next-line no-restricted-imports
import { unstable_getServerSession as getServerSession } from 'next-auth/next'
import { authOptions } from '../pages/api/auth/[...nextauth]'

import { sleep } from './helpers'

export const withApi = (handler: NextApiHandler): NextApiHandler => {
  return async (req, res) => {
    await sleep(2000)
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
      res.status(401).end()
      return
    }
    await handler(req, res)
  }
}
