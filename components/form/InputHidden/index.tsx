import { FunctionComponent, useMemo } from 'react'

import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'

import { useController, useFormContext } from 'components/form'
import { StyledFormControl as FormControl } from '../styles'
import { useInputGroupRegister } from '../InputGroupProvider'

import { InputHiddenProps } from './types'

const InputHidden: FunctionComponent<InputHiddenProps> = ({ name }) => {
  const id = `${name}-input`
  const helpId = `${name}-input-help`

  const { control } = useFormContext()
  const {
    field: { ref, value, ...field },
    fieldState: { error }
  } = useController({
    name: name,
    control
  })

  useInputGroupRegister(name)

  const text = useMemo(() => value || '', [value])

  return (
    <FormControl error={!!error} fullWidth>
      <OutlinedInput
        {...field}
        value={text}
        id={id}
        type="text"
        inputRef={ref}
        aria-describedby={helpId}
        size="small"
        sx={{ display: 'none' }}
      />
      {error && <FormHelperText id={helpId}>{error.message}</FormHelperText>}
    </FormControl>
  )
}

export default InputHidden
