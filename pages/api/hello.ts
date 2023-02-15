import { withApi } from 'backend'
import type { NextApiRequest as Req, NextApiResponse as Res } from 'next'

export default withApi(
  (
    _req: Req,
    res: Res<{
      name: string
    }>
  ) => {
    res.status(200).json({ name: 'John Doe' })
  }
)
