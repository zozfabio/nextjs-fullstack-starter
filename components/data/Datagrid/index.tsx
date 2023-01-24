import {
  Ref,
  useMemo,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef
} from 'react'

import { ptBR, GridSelectionModel } from '@mui/x-data-grid'

import { useRows } from './hooks'
import { getMuiColumns } from './helpers'
import { StyledDataGrid } from './styles'
import {
  DatagridRowId,
  DatagridProps,
  StyledMuiDataGridProps,
  DatagridRef
} from './types'

import CustomFooter from './CustomFooter'
import CustomNoRowOverlay from './CustomNoRowOverlay'

const Datagrid = forwardRef<DatagridRef, DatagridProps>(function Datagrid(
  {
    actions,
    columns,
    rows,
    selectable = true,
    singleSelection = false,
    selection: selectionProp,
    onSelectionChange,
    sort,
    filter,
    autoHeight,
    footer,
    rowHeight,
    ...dataGridProps
  }: DatagridProps,
  ref: Ref<DatagridRef>
) {
  const [rowsProps, refresh] = useRows(rows, sort, filter)
  const [selection, setSelection] = useState<DatagridRowId[]>([])

  const selectionPropIds = useMemo(() => {
    return (selectionProp && selectionProp.map((r) => r.id)) || []
  }, [selectionProp])
  useEffect(() => {
    setSelection((prevSelection) => {
      if (selectionPropIds !== prevSelection) {
        return selectionPropIds
      }
      return prevSelection
    })
  }, [selectionPropIds])

  const selectionProps = useMemo((): Partial<StyledMuiDataGridProps> => {
    if (selectable) {
      return {
        checkboxSelection: !singleSelection,
        onSelectionModelChange: (newSelection: GridSelectionModel) => {
          setSelection(newSelection)
          onSelectionChange &&
            onSelectionChange(
              rowsProps.rows.filter((r) => newSelection.includes(r.id))
            )
        },
        selectionModel: selection
      }
    }
    return {}
  }, [
    selectable,
    singleSelection,
    selection,
    onSelectionChange,
    rowsProps.rows
  ])

  useImperativeHandle(
    ref,
    () =>
      ({
        refresh
      } as DatagridRef),
    [refresh]
  )

  return (
    <StyledDataGrid
      {...dataGridProps}
      rowHeight={rowHeight}
      headerHeight={60}
      columns={getMuiColumns(selectable, singleSelection, columns, actions)}
      localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
      hideFooterSelectedRowCount={!selectable}
      components={{
        Pagination: CustomFooter,
        NoRowsOverlay: CustomNoRowOverlay
      }}
      componentsProps={{
        pagination: { footer }
      }}
      autoHeight={autoHeight}
      {...selectionProps}
      {...rowsProps}
    />
  )
})

Datagrid.defaultProps = {
  selectable: true,
  singleSelection: false,
  autoHeight: false,
  rowHeight: 60
}

export default Datagrid
