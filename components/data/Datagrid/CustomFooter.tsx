import { FunctionComponent, ReactNode } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import PaginationSlot from './PaginationSlot'
import VisibleRowsSlot from './VisibleRowsSlot'

const CustomFooter: FunctionComponent<{
  footer: ReactNode | (() => ReactNode)
}> = ({ footer }) => {
  return (
    <Box p={3} fontWeight="normal" flexGrow={1}>
      {footer ? (
        <>{typeof footer === 'function' ? footer() : footer}</>
      ) : (
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          paddingY={1}
        >
          <VisibleRowsSlot />
          <PaginationSlot />
          <Box width={200}></Box>
        </Grid>
      )}
    </Box>
  )
}

export default CustomFooter
