import React, {
  ChangeEvent,
  FunctionComponent,
  useCallback,
  useState
} from 'react'

import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import FormHelperText from '@mui/material/FormHelperText'

import NuvyInputBase from '../InputBase'

import {
  StyledFormControl as FormControl,
  StyledLabel as Label
} from '../styles'

import { InputUsernameState, InputUsernameProps } from './types'

const InputUsername: FunctionComponent<InputUsernameProps> = ({
  name,
  label,
  placeholder,
  autoFocus,
  xs,
  sm,
  md,
  lg,
  xl
}) => {
  const id = `${name}-input`
  const helpId = `${name}-input-help`

  const [{ value, error }, setState] = useState<InputUsernameState>({
    value: '',
    error: ''
  })
  const handleChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setState((prev) => ({ ...prev, value }))
    },
    []
  )

  const input = (
    <FormControl error={!!error} variant="outlined" fullWidth>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {label && (
          <Label forId={id} error={!!error} required={false}>
            {label}
          </Label>
        )}
      </Stack>
      <NuvyInputBase
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        type="text"
        aria-describedby={helpId}
        placeholder={placeholder}
        autoFocus={autoFocus}
        inputProps={{ maxLength: 100 }}
      />
      {error && <FormHelperText id={helpId}>{error}</FormHelperText>}
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

InputUsername.defaultProps = {
  autoFocus: false
}

export default InputUsername
