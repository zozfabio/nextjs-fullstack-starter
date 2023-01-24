declare type CustomNextPage<P = {}, IP = P> = NextPage<P, IP> & {
  auth?: {
    isPublic?: boolean
  }
}
