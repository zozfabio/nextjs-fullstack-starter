import { FunctionComponent } from 'react'

import Typography from '@mui/material/Typography'

import InputNumber from '../InputNumber'

import { InputPercentageProps } from './types'

const InputPercentage: FunctionComponent<InputPercentageProps> = ({
  name,
  label,
  placeholder,
  required,
  disabled,
  tooltipInfo,
  maxLength,
  decimalSize,
  allowNegative,
  xs,
  sm,
  md,
  lg,
  xl
}) => {
  return (
    <InputNumber
      name={name}
      label={label}
      placeholder={placeholder}
      decimalSize={decimalSize}
      decimalSeparator=","
      allowNegative={allowNegative}
      required={required}
      disabled={disabled}
      maxLength={maxLength}
      tooltipInfo={tooltipInfo}
      startAdornment={
        <Typography
          variant="body1"
          component="span"
          color="gray"
          marginRight={1}
        >
          %
        </Typography>
      }
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
    />
  )
}

InputPercentage.defaultProps = {
  required: false,
  disabled: false,
  decimalSize: 2
}

export default InputPercentage
