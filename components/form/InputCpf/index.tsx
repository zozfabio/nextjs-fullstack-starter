import { FunctionComponent, useMemo } from 'react'

import Grid from '@mui/material/Grid'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'

import { useController, useFormContext } from 'components/form'
import {
  StyledFormControl as FormControl,
  StyledLabel as Label
} from '../styles'
import { useInputGroupRegister } from '../InputGroupProvider'

import { InputCpfProps } from './types'
import CpfMask from './CpfMask'

const InputCpf: FunctionComponent<InputCpfProps> = ({
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
    fieldState: { invalid, error }
  } = useController({
    name: name,
    control
  })
  useInputGroupRegister(name)

  const cpf = useMemo(() => (value === undefined ? '' : value), [value])

  const input = (
    <FormControl error={invalid} variant="outlined" fullWidth>
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
        inputComponent={CpfMask as any}
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

InputCpf.defaultProps = {
  required: false,
  disabled: false
}

export default InputCpf
