declare type NextPage<P = {}, IP = P> = import('next').NextPage<P, IP>
declare type CustomNextPage<P = {}, IP = P> = NextPage<P, IP> & {
  auth?: {
    isPublic?: boolean
  }
}
