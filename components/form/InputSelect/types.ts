import { InputProps } from '../types'

export type InputSelectItem = Selectable

export type InputSelectItemId = InputSelectItem['id']
export type InputSelectItemLabel = ReturnType<InputSelectItem['toString']>

export interface InputSelectProps extends InputProps {
  items: InputSelectItem[]
  emptyOption?: boolean
  truncateText?: boolean
}
