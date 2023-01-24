import React from 'react'

import Radio from '@mui/material/Radio'
import { useGridApiContext } from '@mui/x-data-grid'

import { DatagridRadioRowSelectionProps } from './types'

const RadioRowSelection = ({ rowId }: DatagridRadioRowSelectionProps) => {
  const apiRef = useGridApiContext()
  return (
    <Radio
      checked={apiRef.current.isRowSelected(rowId)}
      value={rowId}
      name="radioRowSelection"
      sx={{
        '&.Mui-checked': (theme) => ({
          color: theme.palette.common.black
        })
      }}
      inputProps={{ 'aria-label': 'Select Row' }}
    />
  )
}

export default RadioRowSelection
