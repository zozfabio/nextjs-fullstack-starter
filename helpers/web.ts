export type QueryParams = Record<
  string,
  string | string[] | number | number[] | boolean | boolean[] | undefined
>

export function queryParamsToString(params?: QueryParams): string {
  if (params) {
    const values = Object.values(params)
    return `?${Object.keys(params)
      .map((key, i) => {
        if (values[i] !== undefined && values[i] !== '') {
          return `${key}=${encodeURI(`${values[i]}`)}`
        }
        return ''
      })
      .filter((v) => v)
      .join('&')}`
  }
  return ''
}

export const toStateQueryParam = (
  object?: Record<string, string | number | undefined>
): string => {
  if (object) {
    const json = JSON.stringify(object)
    return json.slice(1, json.length - 1)
  }
  return ''
}

export const fromStateQueryParam = (
  state?: string | string[]
): Record<string, string | number> | undefined => {
  if (state && typeof state === 'string' && (state = state.trim())) {
    try {
      return JSON.parse(`{${state}}`)
    } catch (err: unknown) {
      console.error(
        'Erro ao decodificar o valor do parametro de estado! valor: %s',
        state,
        err
      )
    }
  }
}
