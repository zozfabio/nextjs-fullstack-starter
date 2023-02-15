import { FunctionComponent, useEffect, useMemo } from 'react'

import FormHelperText from '@mui/material/FormHelperText'
import OutlinedInput from '@mui/material/OutlinedInput'
import Grid from '@mui/material/Grid'

import { useController, useFormContext } from 'components/form'
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

  const cpfCnpj = useMemo(() => (value === undefined ? '' : value), [value])

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
