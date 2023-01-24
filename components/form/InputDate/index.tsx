import { FunctionComponent, useCallback, useMemo } from 'react'

import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'

import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import {
  isDate,
  isDateString,
  dateParse,
  startOfDay,
  ptBrLocale
} from 'helpers/time'

import { useController, useFormContext } from '..'
import {
  StyledFormControl as FormControl,
  StyledLabel as Label
} from '../styles'
import { useInputGroupRegister } from '../InputGroupProvider'

import { InputDateProps } from './types'

const InputDate: FunctionComponent<InputDateProps> = ({
  name,
  label,
  placeholder,
  required = false,
  disabled = false,
  disableFuture = false,
  helpText,
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
    name: name,
    control
  })

  useInputGroupRegister(name)

  const date = useMemo(() => {
    if (isDateString(value)) {
      return dateParse(value)
    } else if (isDate(value)) {
      return value
    }
    return null
  }, [value])

  const handleChange = useCallback(
    (date: Date | string | null, keyboardInputValue?: string) => {
      if (!keyboardInputValue && isDate(date)) {
        onChange(startOfDay(date))
      } else if (keyboardInputValue && isDateString(keyboardInputValue)) {
        onChange(dateParse(keyboardInputValue))
      } else {
        onChange(null)
      }
    },
    [onChange]
  )

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
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBrLocale}>
        <DatePicker
          {...field}
          value={date}
          onChange={handleChange}
          components={{
            OpenPickerIcon: () => (
              <CalendarTodayIcon color="secondary" fontSize="small" />
            )
          }}
          disableFuture={disableFuture}
          disableHighlightToday={false}
          ref={ref}
          renderInput={({ inputRef, inputProps, InputProps }) => {
            return (
              <OutlinedInput
                value={inputProps?.value || ''}
                onChange={inputProps?.onChange}
                onBlur={inputProps?.onBlur}
                name={inputProps?.name}
                id={id}
                type="text"
                inputRef={inputRef}
                disabled={disabled}
                aria-describedby={helpId}
                placeholder={placeholder}
                size="small"
                style={{
                  backgroundColor: '#FFFFFF'
                }}
                endAdornment={InputProps?.endAdornment}
              />
            )
          }}
        />
      </LocalizationProvider>
      {error && <FormHelperText id={helpId}>{error.message}</FormHelperText>}
      {!error && helpText && (
        <FormHelperText id={helpId} sx={{ marginLeft: 0 }}>
          <Typography
            variant="body1"
            fontSize={12}
            color="gray"
            component="span"
          >
            {helpText}
          </Typography>
        </FormHelperText>
      )}
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

InputDate.defaultProps = {
  required: false,
  disabled: false,
  disableFuture: false
}

export default InputDate
