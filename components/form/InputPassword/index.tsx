import React, {
  ChangeEvent,
  FunctionComponent,
  useCallback,
  useState
} from 'react'

import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import FormHelperText from '@mui/material/FormHelperText'

import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import NuvyInputBase from '../InputBase'

import {
  StyledFormControl as FormControl,
  StyledLabel as Label
} from '../styles'

import { InputPasswordState, InputPasswordProps } from './types'

const InputPassword: FunctionComponent<InputPasswordProps> = ({
  name,
  label,
  placeholder,
  xs,
  sm,
  md,
  lg,
  xl
}) => {
  const id = `${name}-input`
  const helpId = `${name}-input-help`

  const [{ value, error, visible }, setState] = useState<InputPasswordState>({
    value: '',
    error: '',
    visible: false
  })
  const handleChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setState((prev) => ({ ...prev, value }))
    },
    []
  )
  const toggleVisible = useCallback(() => {
    setState((prev) => ({ ...prev, visible: !prev.visible }))
  }, [])

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
        type={visible ? 'text' : 'password'}
        aria-describedby={helpId}
        placeholder={placeholder}
        inputProps={{ maxLength: 50 }}
        autoComplete="off"
        InputProps={{
          endAdornment: (
            <IconButton
              aria-label="Toggle password visibility"
              onClick={toggleVisible}
              edge="end"
              sx={{
                backgroundColor: 'transparent',
                color: '#000000'
              }}
            >
              {!visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          )
        }}
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

export default InputPassword
