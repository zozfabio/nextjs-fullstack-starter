// eslint-disable-next-line no-restricted-imports
import { useTranslation } from 'react-i18next'

export function useTranslate(nss: string | string[]) {
  const { t } = useTranslation(nss)
  return function (key: string, opt?: { ns?: string }) {
    if (opt) {
      return t(key, opt) || ''
    }
    return t(key) || ''
  }
}
