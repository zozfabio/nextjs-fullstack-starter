import { FunctionComponent } from 'react'

import Typography from '@mui/material/Typography'

import InputNumber from '../InputNumber'

import { InputMoneyProps } from './types'

const InputMoney: FunctionComponent<InputMoneyProps> = ({
  name,
  label,
  placeholder,
  required,
  disabled,
  tooltipInfo,
  maxLength,
  decimalSize,
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
      thousandSeparator="."
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
          R$
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

InputMoney.defaultProps = {
  required: false,
  disabled: false,
  decimalSize: 2
}

export default InputMoney
