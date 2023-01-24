import React, { useMemo, FunctionComponent } from 'react'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import InfoIcon from '@mui/icons-material/Info'

import { StyledTab } from './styles'
import { StepperTabProps } from './types'

const StepperTab: FunctionComponent<StepperTabProps> = ({
  label,
  index,
  active,
  valid,
  ...tabProps
}) => {
  const icon = useMemo(() => {
    if (valid) {
      if (index === active) return <CheckCircleOutlineIcon />
      else return <CheckCircleIcon />
    } else if (valid === false) {
      return <InfoIcon color="error" />
    }
    return <RadioButtonUncheckedIcon />
  }, [index, active, valid])
  return (
    <StyledTab
      key={index}
      id={`stepper-tab-${index}`}
      aria-controls={`stepper-tabpanel-${index}`}
      label={label}
      iconPosition="start"
      icon={icon}
      {...tabProps}
    />
  )
}

export default StepperTab
