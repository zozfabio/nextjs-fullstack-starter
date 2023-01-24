import { ReactElement, ReactNode } from 'react'

import {
  DataGridProps as MuiDataGridProps,
  GridSortModel as MuiDataGridSort,
  GridFilterItem as MuiDataGridFilterItem
} from '@mui/x-data-grid'

export type {
  DataGridProps as MuiDataGridProps,
  GridSortModel as MuiDataGridSort,
  GridFilterItem as MuiDataGridFilterItem
} from '@mui/x-data-grid'

export interface StyledMuiDataGridProps extends MuiDataGridProps {
  cellsBorder?: 'none' | 'bottom'
}

export interface DatagridToolbarAction {
  type: 'iconButton' | 'containedButton'
  name: string
  onClick: () => void
  tooltip?: string
  icon?: ReactNode
}

export type DatagridRowId = Id

export type DatagridRow = Identifiable & Record<string, unknown>

export interface DatagridRowAction {
  type: 'iconButton' | 'containedButton'
  name: string
  tooltip?: string
  icon?: ReactNode
  align?: 'left' | 'right' | 'center'
  component?: ReactElement
  onClick: (id: Id) => void
  onEditClick?: (id: Id) => void
  onDeleteClick?: (id: Id) => void
}

export interface DatagridColumn {
  type:
    | 'string'
    | 'number'
    | 'cpfCnpj'
    | 'money'
    | 'date'
    | 'dateTime'
    | 'integerPositiveNegative'
  field: string
  title: string
  width?: number
  flex?: number
  minWidth?: number
  headerBordered?: boolean
  hide?: boolean
  hideable?: boolean
  filterable?: boolean
  sortable?: boolean
  align?: 'center' | 'left' | 'right'
  render?: (row: DatagridRow) => ReactNode
  onChange?: (checked: boolean, id: string | number) => void
}

export interface DatagridRef {
  refresh: () => void
}

export type DatagridCallbackSort = string[]
export type DatagridCallbackFilter = Record<
  string,
  string | string[] | undefined
>
export type DatagridRowsList<T = DatagridRow> = T[]
export type DatagridRowsCallback<T = DatagridRow> = (
  page: number,
  sort?: DatagridCallbackSort,
  filter?: DatagridCallbackFilter
) => Promise<[DatagridRowsList<T>, number]>
export type DatagridRows<T = DatagridRow> =
  | DatagridRowsList<T>
  | DatagridRowsCallback<T>

export const isDatagridRowsCallback = (
  rows: unknown
): rows is DatagridRowsCallback => {
  return typeof rows === 'function'
}

export type DatagridSort = MuiDataGridSort
export type DatagridFilter = MuiDataGridFilterItem[]

export interface DatagridProps
  extends Pick<StyledMuiDataGridProps, 'cellsBorder' | 'rowHeight'> {
  actions?: DatagridRowAction[]
  columns: DatagridColumn[]
  rows: DatagridRows
  selectable?: boolean
  singleSelection?: boolean
  selection?: DatagridRow[]
  onSelectionChange?: (rows: DatagridRow[]) => void
  sort?: DatagridSort
  filter?: DatagridFilter
  autoHeight?: boolean
  footer?: ReactNode | (() => ReactNode)
}

export interface DatagridRadioRowSelectionProps {
  rowId: DatagridRowId
}

export interface DatagridRowsState {
  loading: boolean
  rows: DatagridRow[]
  rowCount: number
}

export interface DatagridPageState {
  page: number
}

export interface DatagridUseRowsDataProps
  extends Pick<
    StyledMuiDataGridProps,
    | 'pagination'
    | 'paginationMode'
    | 'loading'
    | 'onPageChange'
    | 'rowCount'
    | 'pageSize'
    | 'rowsPerPageOptions'
    | 'sortingMode'
    | 'sortModel'
    | 'onSortModelChange'
    | 'filterMode'
    | 'filterModel'
    | 'onFilterModelChange'
  > {
  rows: DatagridRow[]
}

export type DatagridUseRowsReturn = [DatagridUseRowsDataProps, () => void]
