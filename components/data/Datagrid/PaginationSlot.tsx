import React from 'react'

import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import Box from '@mui/material/Box'

import {
  gridPaginationSelector,
  useGridApiContext,
  useGridSelector
} from '@mui/x-data-grid'

const PaginationSlot = () => {
  const apiRef = useGridApiContext()
  const { page, pageCount } = useGridSelector(apiRef, gridPaginationSelector)
  if (pageCount <= 1) {
    return <Box></Box>
  }
  return (
    <Pagination
      showFirstButton
      showLastButton
      siblingCount={0}
      shape="rounded"
      variant="outlined"
      size="large"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
      renderItem={(item) => <PaginationItem {...item} />}
    />
  )
}

export default PaginationSlot
