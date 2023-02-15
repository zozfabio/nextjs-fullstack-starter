import { NextApiHandler } from 'next'

import { getServerSession } from 'next-auth/next'
import { authOptions } from '../pages/api/auth/[...nextauth]'

export const withApi = (handler: NextApiHandler): NextApiHandler => {
  return async (req, res) => {
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
      res.status(401).end()
      return
    }
    await handler(req, res)
  }
}
