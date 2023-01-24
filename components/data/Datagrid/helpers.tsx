import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import {
  GridSortModel as MuiDataGridSort,
  GridFilterModel as MuiDataGridFilter,
  GridRenderCellParams,
  GridColDef,
  getGridStringOperators,
  getGridNumericOperators,
  getGridBooleanOperators,
  getGridDateOperators
} from '@mui/x-data-grid'

import {
  DatagridColumn,
  DatagridCallbackFilter,
  DatagridCallbackSort,
  DatagridRow,
  DatagridRowAction
} from './types'

import RadioRowSelection from './RadioRowSelection'

const supportedTypes = ['string', 'number', 'date', 'dateTime']
const supportedStringOperators = [
  'contains'
  // 'equals',
  // 'startsWith',
  // 'endsWith',
  // 'isEmpty',
  // 'isNotEmpty'
]
const supportedNumberOperators = [
  '='
  // '!=',
  // '>',
  // '>=',
  // '<',
  // '<=',
  // 'isEmpty',
  // 'isNotEmpty'
]
const supportedBooleanOperators = ['is']
const supportedDateTimeOperators = [
  'is'
  //   'not',
  //   'after',
  //   'onOrAfter',
  //   'before',
  //   'onOrBefore',
  //   'isEmpty',
  //   'isNotEmpty'
]

const stringOperators = getGridStringOperators().filter((op) =>
  supportedStringOperators.includes(op.value)
)
const numberOperators = getGridNumericOperators().filter((op) =>
  supportedNumberOperators.includes(op.value)
)
const booleanOperators = getGridBooleanOperators().filter((op) =>
  supportedBooleanOperators.includes(op.value)
)
const dateOperators = getGridDateOperators().filter((op) =>
  supportedDateTimeOperators.includes(op.value)
)
const dateTimeOperators = getGridDateOperators(true).filter((op) =>
  supportedDateTimeOperators.includes(op.value)
)

export function createRadioSelectionMuiColumn(): GridColDef {
  return {
    field: 'radioRowSelection',
    type: 'boolean',
    headerName: '',
    align: 'center',
    headerAlign: 'center',
    headerClassName: 'dg-noHeader',
    hideable: false,
    sortable: false,
    hideSortIcons: true,
    resizable: false,
    width: 80,
    filterable: false,
    renderCell: (
      params: GridRenderCellParams<unknown, DatagridRow, unknown>
    ) => <RadioRowSelection rowId={params.row.id} />
  }
}

function isHideable(col: DatagridColumn): boolean {
  return col.hideable !== undefined ? col.hideable : true
}

function isSortable(col: DatagridColumn): boolean {
  return col.sortable !== undefined ? col.sortable : true
}

function isFilterable(col: DatagridColumn): boolean {
  return col.filterable !== undefined ? col.filterable : true
}

function getHeaderClassNames(col: DatagridColumn): string {
  const classNames = [
    col.headerBordered === false ? 'dg-noHeader' : 'dg-header'
  ]
  if (!isHideable(col) && !isSortable(col) && !isFilterable(col)) {
    classNames.push('dg-noActions')
  }
  return classNames.join(' ')
}

function getColumnWidth({
  width,
  minWidth,
  flex
}: DatagridColumn): Pick<GridColDef, 'width' | 'minWidth' | 'flex'> {
  if (width) {
    return {
      width
    }
  }
  if (flex) {
    return {
      flex,
      minWidth
    }
  }
  return { flex: 1, minWidth }
}

function getHabilities(
  col: DatagridColumn
): Pick<GridColDef, 'hideable' | 'sortable' | 'filterable' | 'resizable'> {
  return {
    hideable: isHideable(col),
    sortable: isSortable(col),
    filterable: isFilterable(col),
    resizable: false
  }
}

function getAlignment({
  align
}: DatagridColumn): Pick<GridColDef, 'align' | 'headerAlign'> {
  return {
    align: align || 'left',
    headerAlign: align || 'left'
  }
}

export function parseMuiColumn(col: DatagridColumn): GridColDef {
  const headerClassName = getHeaderClassNames(col)
  const widthProps = getColumnWidth(col)
  const habilitiesProps = getHabilities(col)
  const alignmentProps = getAlignment(col)
  const renderHeader = () => (
    <Typography variant="body2">{col.title}</Typography>
  )
  if (col.type === 'date') {
    return {
      field: col.field,
      type: 'date',
      headerName: col.title,
      hide: col.hide !== undefined ? col.hide : false,
      ...widthProps,
      ...habilitiesProps,
      ...alignmentProps,
      headerClassName,
      renderHeader,
      filterOperators: dateOperators,
      renderCell: (
        params: GridRenderCellParams<unknown, Record<string, string>, unknown>
      ) => <Typography variant="caption">{params.row[col.field]}</Typography>
    }
  } else if (col.type === 'dateTime') {
    return {
      field: col.field,
      type: 'dateTime',
      headerName: col.title,
      hide: col.hide !== undefined ? col.hide : false,
      ...widthProps,
      ...habilitiesProps,
      ...alignmentProps,
      headerClassName,
      renderHeader,
      filterOperators: dateTimeOperators,
      renderCell: (
        params: GridRenderCellParams<unknown, Record<string, string>, unknown>
      ) => <Typography variant="caption">{params.row[col.field]}</Typography>
    }
  }
  return {
    field: col.field,
    type: col.type,
    headerName: col.title,
    hide: col.hide !== undefined ? col.hide : false,
    ...widthProps,
    ...habilitiesProps,
    ...alignmentProps,
    headerClassName,
    renderHeader,
    filterOperators:
      col.type === 'number'
        ? numberOperators
        : col.type === 'string'
        ? stringOperators
        : [],
    renderCell: (
      params: GridRenderCellParams<unknown, Record<string, string>, unknown>
    ) => <Typography variant="caption">{params.row[col.field]}</Typography>
  }
}

export function createActionsMuiColumn(
  actions: DatagridRowAction[]
): GridColDef {
  return {
    field: 'actions',
    type: 'string',
    headerName: 'Ações',
    align: 'right',
    headerAlign: 'right',
    headerClassName: 'dg-headerAction',
    hideable: false,
    sortable: false,
    hideSortIcons: true,
    resizable: false,
    width: 120,
    filterable: false,
    renderCell: (
      params: GridRenderCellParams<unknown, DatagridRow, unknown>
    ) => (
      <>
        {actions.map((action: DatagridRowAction, index) => {
          if (action.type === 'containedButton') {
            return (
              <Button
                key={`${params.id}-${index}`}
                onClick={() => action.onClick(params.id)}
                variant="outlined"
                size="small"
              >
                {action.tooltip || ''}
              </Button>
            )
          }
          if (action.type === 'iconButton') {
            const btn = (
              <IconButton
                key={`${params.id}-${index}`}
                onClick={() => action.onClick(params.id)}
                size="small"
              >
                {action.icon}
              </IconButton>
            )
            if (action.tooltip) {
              return (
                <Tooltip key={`${params.id}-${index}`} title={action.tooltip}>
                  <span>{btn}</span>
                </Tooltip>
              )
            }
            return btn
          }
        })}
      </>
    )
  }
}

export function getMuiColumns(
  selectable: boolean,
  singleSelection: boolean,
  columns: DatagridColumn[],
  actions?: DatagridRowAction[]
): GridColDef[] {
  const cols: GridColDef[] = []
  if (selectable && singleSelection) {
    cols.push(createRadioSelectionMuiColumn())
  }
  columns
    .filter((col) => supportedTypes.includes(col.type))
    .map((col: DatagridColumn) => parseMuiColumn(col))
    .forEach((col) => cols.push(col))
  if (actions && actions.length) {
    cols.push(createActionsMuiColumn(actions))
  }
  return cols
}

export function parseSort(
  sort: MuiDataGridSort
): DatagridCallbackSort | undefined {
  if (sort instanceof Array) {
    if (sort.length === 0) {
      return
    }
    return sort.map((order) => `${order.field},${order.sort}`)
  }
}

export function parseFilter(
  filter: MuiDataGridFilter
): DatagridCallbackFilter | undefined {
  const newFilter: DatagridCallbackFilter = {}
  if (filter.items instanceof Array) {
    if (filter.items.length === 0) {
      return
    }
    filter.items.forEach((it) => {
      if (it.value) {
        newFilter[it.columnField] = `${it.value}`
      }
    })
  }
  return newFilter
}
