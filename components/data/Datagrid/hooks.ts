import { useMemo, useState, useEffect, useCallback } from 'react'

import {
  GridSortModel as MuiDataGridSort,
  GridFilterModel as MuiDataGridFilter
} from '@mui/x-data-grid'

import {
  DatagridSort,
  DatagridFilter,
  DatagridRows,
  DatagridRowsState,
  DatagridPageState,
  DatagridUseRowsReturn,
  DatagridUseRowsDataProps,
  isDatagridRowsCallback
} from './types'

import { parseSort, parseFilter } from './helpers'

export function useRows(
  rows: DatagridRows,
  sort?: DatagridSort,
  filter?: DatagridFilter
): DatagridUseRowsReturn {
  const [pageState, setPageState] = useState<DatagridPageState>({ page: 0 })
  const [sortState, setSortState] = useState<MuiDataGridSort>(sort || [])
  const [filterState, setFilterState] = useState<MuiDataGridFilter>({
    items: filter || []
  })
  const [rowsState, setRowsState] = useState<DatagridRowsState>(
    isDatagridRowsCallback(rows)
      ? { loading: true, rows: [], rowCount: 0 }
      : { loading: false, rows: rows, rowCount: rows.length }
  )

  useEffect(() => {
    if (filter) {
      setFilterState((prev) => {
        if (prev.items === filter) {
          return prev
        }
        return { items: filter }
      })
    }
  }, [filter])

  const fetch = useCallback(() => {
    if (isDatagridRowsCallback(rows)) {
      rows(pageState.page, parseSort(sortState), parseFilter(filterState))
        .then(([rows, rowCount]) => {
          setRowsState({ loading: false, rows, rowCount })
        })
        .catch((error) => console.error(error))
    }
  }, [rows, pageState, sortState, filterState])

  useEffect(() => {
    if (isDatagridRowsCallback(rows)) {
      fetch()
    } else {
      setRowsState((prevState) => {
        const rowCount = rows.length
        if (prevState.rows !== rows) {
          return { loading: false, rows, rowCount }
        }
        return prevState
      })
    }
  }, [rows, fetch])

  const rowsProps = useMemo((): DatagridUseRowsDataProps => {
    if (isDatagridRowsCallback(rows)) {
      return {
        pagination: true,
        paginationMode: 'server',
        pageSize: 10,
        rowsPerPageOptions: [10],
        onPageChange: (page) => {
          setPageState({ page })
        },
        sortingMode: 'server',
        sortModel: sortState,
        onSortModelChange: (newSortModel) => {
          setSortState(newSortModel)
        },
        filterMode: 'server',
        filterModel: filterState,
        onFilterModelChange: (newFilterModel) => {
          setFilterState(newFilterModel)
        },
        ...rowsState
      }
    } else {
      return {
        pagination: true,
        paginationMode: 'client',
        pageSize: 10,
        rowsPerPageOptions: [10],
        sortingMode: 'client',
        sortModel: sortState,
        onSortModelChange: (newSortModel) => {
          setSortState(newSortModel)
        },
        filterMode: 'client',
        filterModel: filterState,
        onFilterModelChange: (newFilterModel) => {
          setFilterState(newFilterModel)
        },
        ...rowsState
      }
    }
  }, [rows, sortState, filterState, rowsState])

  const refresh = useCallback(() => {
    setPageState((prevState) => ({ ...prevState }))
  }, [])

  return [rowsProps, refresh]
}
