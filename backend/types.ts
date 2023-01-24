export type Json = Record<string, unknown>
export type JsonMapper = (json: Json) => Json

export class ApiClientError {
  readonly message: string
  readonly code: string
  constructor(message: string, code: string) {
    this.message = message
    this.code = code
  }
}
