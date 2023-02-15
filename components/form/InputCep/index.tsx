import React, { FunctionComponent, useMemo } from 'react'

import Grid from '@mui/material/Grid'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'

import CepMask from './CepMask'

import { useController, useFormContext } from 'components/form'
import {
  StyledFormControl as FormControl,
  StyledLabel as Label
} from '../styles'
import { useInputGroupRegister } from '../InputGroupProvider'

import { InputCepProps } from './types'

const InputCep: FunctionComponent<InputCepProps> = ({
  name,
  label,
  placeholder,
  required = false,
  disabled = false,
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

  const cpf = useMemo(() => (value === undefined ? '' : value), [value])

  const input = (
    <FormControl error={!!error} variant="outlined" fullWidth>
      {label && (
        <Label forId={id} error={!!error} required={required}>
          {label}
        </Label>
      )}
      <OutlinedInput
        {...field}
        value={cpf}
        onChange={onChange}
        id={id}
        type="text"
        inputRef={ref}
        disabled={disabled}
        aria-describedby={helpId}
        placeholder={placeholder}
        inputComponent={CepMask as any}
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

InputCep.defaultProps = {
  required: false,
  disabled: false
}

export default InputCep
