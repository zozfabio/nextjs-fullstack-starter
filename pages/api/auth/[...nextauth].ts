/* eslint-disable no-restricted-imports */
import { v4 as uuid } from 'uuid'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login'
  },
  session: {
    maxAge: 30 * 60 // 30 min
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        if (
          credentials?.username === 'user@temp.com' &&
          credentials?.password === 'userpass'
        ) {
          return {
            id: uuid(),
            name: 'User',
            email: 'user@temp.com'
          }
        } else {
          return null
        }
      }
    })
  ]
}

export default NextAuth(authOptions)
