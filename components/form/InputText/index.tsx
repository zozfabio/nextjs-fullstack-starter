import React, {
  ChangeEvent,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo
} from 'react'

import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

import { useController, useFormContext } from '..'
import {
  StyledFormControl as FormControl,
  StyledLabel as Label
} from '../styles'
import { useInputGroupRegister } from '../InputGroupProvider'

import { InputTextProps } from './types'

const InputText: FunctionComponent<InputTextProps> = ({
  name,
  defaultValue,
  label,
  placeholder,
  required,
  disabled,
  readOnly,
  maxLength,
  allowNumber = true,
  onVerifyExternalValidation,
  tooltipInfo,
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

  const text = useMemo(() => value || '', [value])

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (allowNumber) {
        onChange(event)
      } else {
        onChange(event.target.value.replace(/[0-9]/g, ''))
      }
    },
    [allowNumber, onChange]
  )

  // TODO - don't register this input if verifier is not provided
  // É usado para validações customizadas
  const inputValidName = `${name}_isvalid`
  const {
    field: { value: valueValid, onChange: onChangeValid, ...fieldValid }
  } = useController({
    name: inputValidName,
    control
  })

  useInputGroupRegister(inputValidName)

  const textValid = useMemo(
    () => (valueValid === undefined ? '' : valueValid),
    [valueValid]
  )

  useEffect(() => {
    if (text && defaultValue !== text && onVerifyExternalValidation) {
      onVerifyExternalValidation(text).then((isValid) => {
        onChangeValid(isValid)
      })
    }
  }, [defaultValue, onChangeValid, onVerifyExternalValidation, text])

  const input = (
    <FormControl
      error={!!error}
      variant="outlined"
      fullWidth
      disabled={disabled}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {label && (
          <Label forId={id} error={!!error} required={required || false}>
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
      <OutlinedInput
        {...field}
        value={text}
        onChange={handleChange}
        id={id}
        type="text"
        inputRef={ref}
        disabled={disabled}
        readOnly={readOnly}
        aria-describedby={helpId}
        placeholder={!disabled && !readOnly ? placeholder : undefined}
        inputProps={{ maxLength: maxLength ? maxLength : undefined }}
        size="small"
      />
      {onVerifyExternalValidation && (
        <input
          {...fieldValid}
          value={textValid}
          onChange={onChangeValid}
          style={{ display: 'none' }}
        />
      )}
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

InputText.defaultProps = {
  required: false,
  disabled: false,
  readOnly: false
}

export default InputText
