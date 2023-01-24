declare type Id = number | string

declare interface Identifiable {
  id: Id
}

declare interface Selectable extends Identifiable {
  toString: () => string
}

declare type NextPage<P = {}, IP = P> = import('next').NextPage<P, IP>
declare type CustomNextPage<P = {}, IP = P> = NextPage<P, IP> & {
  auth?: {
    isPublic?: boolean
  }
}
