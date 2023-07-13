import { FunctionComponent, useMemo } from 'react'

// eslint-disable-next-line no-restricted-imports
import { useController, useFormContext } from 'react-hook-form'

import Grid from '@mui/material/Grid'
import FormHelperText from '@mui/material/FormHelperText'
import OutlinedInput from '@mui/material/OutlinedInput'

import {
  StyledFormControl as FormControl,
  StyledLabel as Label
} from '../styles'
import { useInputGroupRegister } from '../InputGroupProvider'

import { InputCnpjProps } from './types'
import CnpjMask from './CnpjMask'

const InputCnpj: FunctionComponent<InputCnpjProps> = ({
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
    name: name,
    control
  })

  useInputGroupRegister(name)

  const cnpj = useMemo(() => (value === undefined ? '' : value), [value])

  const input = (
    <FormControl error={!!error} variant="outlined" fullWidth>
      {label && (
        <Label forId={id} error={!!error} required={required}>
          {label}
        </Label>
      )}
      <OutlinedInput
        {...field}
        value={cnpj}
        onChange={onChange}
        id={id}
        type="text"
        inputRef={ref}
        disabled={disabled}
        aria-describedby={helpId}
        placeholder={placeholder}
        inputComponent={CnpjMask as any}
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

InputCnpj.defaultProps = {
  required: false,
  disabled: false
}

export default InputCnpj
