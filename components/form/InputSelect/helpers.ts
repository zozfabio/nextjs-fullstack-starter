import {
  InputSelectItem,
  InputSelectItemId,
  InputSelectItemLabel
} from './types'

export const nullId = (item: InputSelectItem): InputSelectItemId =>
  item.id ||
  (typeof item.id === 'number' ? 0 : typeof item.id === 'string' ? '' : 0)

export const nullLabel = (item: InputSelectItem): InputSelectItemLabel =>
  item.toString() || ''
