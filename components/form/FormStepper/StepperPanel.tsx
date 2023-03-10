import React, { PropsWithChildren, FunctionComponent } from 'react'

import Box from '@mui/material/Box'

import { StepperPanelProps } from './types'

const StepperPanel: FunctionComponent<PropsWithChildren<StepperPanelProps>> = ({
  index,
  active,
  children
}) => {
  return (
    <Box
      id={`stepper-tabpanel-${index}`}
      role="tabpanel"
      hidden={index !== active}
      aria-labelledby={`stepper-tab-${index}`}
      sx={{ flexGrow: 1 }}
      bgcolor="background.paper"
    >
      {children}
    </Box>
  )
}

export default StepperPanel
