import { FunctionComponent, useEffect, useMemo } from 'react'

import FormHelperText from '@mui/material/FormHelperText'
import OutlinedInput from '@mui/material/OutlinedInput'
import Grid from '@mui/material/Grid'

import { useController, useFormContext } from '..'
import {
  StyledFormControl as FormControl,
  StyledLabel as Label
} from '../styles'
import { useInputGroupRegister } from '../InputGroupProvider'

import { InputCpfCnpjProps } from './types'
import CpfCnpjMask from './CpfCnpjMask'

const InputCpfCnpj: FunctionComponent<InputCpfCnpjProps> = ({
  name,
  label,
  placeholder,
  defaultValue,
  required = false,
  disabled = false,
  onVerifyExternalValidation,
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

  const cpfCnpj = useMemo(() => (value === undefined ? '' : value), [value])

  // TODO - don't register this input if verifier is not provided
  //** É usado para validações customizadas  */
  const inputValidName = `${name}_isvalid`
  const {
    field: { value: valueValid, onChange: onChangeValid, ...fieldValid }
  } = useController({
    name: inputValidName,
    control
  })

  useInputGroupRegister(inputValidName)

  const isValid = useMemo(
    () => (valueValid === undefined ? '' : valueValid),
    [valueValid]
  )

  useEffect(() => {
    if (cpfCnpj && defaultValue !== cpfCnpj && onVerifyExternalValidation) {
      onVerifyExternalValidation(cpfCnpj).then((isValid) => {
        onChangeValid(isValid)
      })
    }
  }, [onChangeValid, onVerifyExternalValidation, cpfCnpj, defaultValue])

  const input = (
    <FormControl error={!!error} variant="outlined" fullWidth>
      {label && (
        <Label forId={id} error={!!error} required={required}>
          {label}
        </Label>
      )}
      <OutlinedInput
        {...field}
        value={cpfCnpj}
        onChange={onChange}
        id={id}
        type="text"
        inputRef={ref}
        disabled={disabled}
        aria-describedby={helpId}
        placeholder={placeholder}
        inputComponent={CpfCnpjMask as any}
        size="small"
      />
      {onVerifyExternalValidation && (
        <input
          {...fieldValid}
          value={isValid}
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

InputCpfCnpj.defaultProps = { required: false, disabled: false }

export default InputCpfCnpj
