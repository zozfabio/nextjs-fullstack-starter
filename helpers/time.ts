/* eslint-disable no-restricted-imports */
import { isDate as isDateFns, parse, format } from 'date-fns'

export { startOfDay } from 'date-fns'
export { default as ptBrLocale } from 'date-fns/locale/pt-BR'

export function isDate(date: unknown): date is Date {
  return isDateFns(date) && !isNaN((date as Date).getTime())
}

export function isDateString(date: unknown): boolean {
  return typeof date === 'string' && /\d{2}\/\d{2}\/\d{4}/.test(date)
}

export function parseDate(value: string, format?: string): Date {
  return parse(value, format || 'dd/MM/yyyy', new Date())
}
