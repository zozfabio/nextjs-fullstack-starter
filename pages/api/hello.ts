import type { NextApiRequest as Req, NextApiResponse as Res } from 'next'

export default function handler(
  _req: Req,
  res: Res<{
    name: string
  }>
) {
  res.status(200).json({ name: 'John Doe' })
}
