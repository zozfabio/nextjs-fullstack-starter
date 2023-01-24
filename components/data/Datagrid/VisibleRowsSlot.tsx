import React, { useMemo } from 'react'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import {
  gridPaginationSelector,
  useGridApiContext,
  useGridSelector
} from '@mui/x-data-grid'

export const VisibleRowsSlot = () => {
  const apiRef = useGridApiContext()
  const {
    rowCount: totalRowCount,
    page,
    pageSize,
    pageCount
  } = useGridSelector(apiRef, gridPaginationSelector)
  const seenRowCount = useMemo(
    () =>
      totalRowCount <= pageSize
        ? totalRowCount
        : page + 1 === pageCount
        ? totalRowCount % (page * pageSize)
        : pageSize,
    [totalRowCount, page, pageSize, pageCount]
  )
  if (seenRowCount <= 0) {
    return <Box width={200}></Box>
  }
  return (
    <Typography variant="body1" fontSize={14} component={Box} width={200}>
      <Box>Mostrando</Box>
      {totalRowCount <= pageSize ? (
        <Box>
          <Box component="span" sx={{ fontWeight: 'bold' }}>
            {seenRowCount}
          </Box>{' '}
          registros
        </Box>
      ) : (
        <Box>
          <Box component="span" sx={{ fontWeight: 'bold' }}>
            {seenRowCount}
          </Box>{' '}
          de{' '}
          <Box component="span" sx={{ fontWeight: 'bold' }}>
            {isNaN(totalRowCount) ? 0 : totalRowCount}
          </Box>{' '}
          registros
        </Box>
      )}
    </Typography>
  )
}

export default VisibleRowsSlot
