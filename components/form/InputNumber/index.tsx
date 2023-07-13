import {
  ChangeEvent,
  FunctionComponent,
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useMemo
} from 'react'

// eslint-disable-next-line no-restricted-imports
import { useController, useFormContext } from 'react-hook-form'

import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import FormHelperText from '@mui/material/FormHelperText'

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

import {
  StyledFormControl as FormControl,
  StyledLabel as Label
} from '../styles'
import NuvyInputBase from '../InputBase'
import { useInputGroupRegister } from '../InputGroupProvider'

import { InputNumberProps } from './types'
import {
  getDigits,
  getUserDigits,
  formatDigits,
  parseDigits,
  moveCursorEnd
} from './helpers'

const InputNumber: FunctionComponent<InputNumberProps> = ({
  name,
  label,
  placeholder,
  required = false,
  disabled,
  maxLength,
  allowNegative = false,
  decimalSize = 0,
  decimalSeparator = '.',
  thousandSeparator = '',
  tooltipInfo,
  startAdornment,
  xs,
  sm,
  md,
  lg,
  xl
}) => {
  const id = `${name}-input`
  const helpId = `${name}-input-help`

  const { control } = useFormContext()
  const {
    field: { ref, value, onChange, ...field },
    fieldState: { error }
  } = useController({
    name,
    control
  })

  useInputGroupRegister(name)

  const inputValue = useMemo(() => {
    const digits = getDigits(
      typeof value === 'number'
        ? `${value.toFixed(decimalSize)}`
        : typeof value === 'string'
        ? value
        : '0',
      decimalSize,
      allowNegative
    )
    return formatDigits(
      digits,
      decimalSize,
      decimalSeparator,
      thousandSeparator,
      allowNegative
    )
  }, [allowNegative, decimalSeparator, decimalSize, thousandSeparator, value])

  const inputValueChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const userDigits = getUserDigits(
        e.target.value,
        decimalSize,
        allowNegative
      )
      const userDigitsFormatted = formatDigits(
        userDigits,
        decimalSize,
        decimalSeparator,
        thousandSeparator,
        allowNegative
      )
      if (inputValue !== userDigitsFormatted) {
        onChange(parseDigits(userDigits, decimalSize, allowNegative))
      }
      moveCursorEnd(e.target)
    },
    [
      allowNegative,
      decimalSeparator,
      decimalSize,
      inputValue,
      onChange,
      thousandSeparator
    ]
  )

  const keyUpHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    moveCursorEnd(e.currentTarget)
  }, [])

  const mouseUpHandler = useCallback((e: MouseEvent<HTMLInputElement>) => {
    moveCursorEnd(e.target as HTMLInputElement)
  }, [])

  const input = (
    <FormControl error={!!error} variant="outlined" fullWidth>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {label && (
          <Label forId={id} error={!!error} required={required}>
            {label}
          </Label>
        )}
        {tooltipInfo && (
          <Tooltip title={tooltipInfo}>
            <ErrorOutlineIcon
              fontSize="inherit"
              color={error ? 'error' : 'secondary'}
            />
          </Tooltip>
        )}
      </Stack>
      <NuvyInputBase
        {...field}
        value={inputValue}
        onChange={inputValueChangeHandler}
        onKeyUp={keyUpHandler}
        onMouseUp={mouseUpHandler}
        ref={ref}
        id={id}
        disabled={disabled}
        aria-describedby={helpId}
        placeholder={placeholder}
        inputProps={{ maxLength }}
        InputProps={{
          startAdornment
        }}
        type="text"
        size="small"
      />
      {error && <FormHelperText id={helpId}>{error.message}</FormHelperText>}
    </FormControl>
  )
  if (xs || sm || md || lg || xl) {
    return (
      <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
        {input}
      </Grid>
    )
  }
  return input
}

InputNumber.defaultProps = {
  required: false,
  disabled: false,
  allowNegative: false,
  decimalSize: 0,
  decimalSeparator: '.',
  thousandSeparator: ''
}

export default InputNumber
