import React, { FunctionComponent, useCallback, useMemo, useState } from 'react'

import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import Tooltip from '@mui/material/Tooltip'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import { useController, useFormContext } from '..'
import {
  StyledFormControl as FormControl,
  StyledLabel as Label
} from '../styles'
import { useInputGroupRegister } from '../InputGroupProvider'

import { nullId, nullLabel } from './helpers'
import {
  InputSelectItem,
  InputSelectItemId,
  InputSelectItemLabel,
  InputSelectProps
} from './types'

const InputSelect: FunctionComponent<InputSelectProps> = ({
  name,
  label,
  placeholder,
  required,
  items,
  truncateText,
  disabled,
  emptyOption,
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

  const [selectedId, selectedLabel] = useMemo((): [
    InputSelectItemId,
    InputSelectItemLabel
  ] => {
    if (value && value.id) {
      const item = items.find((it) => it.id === value.id)
      if (item) {
        const itemId = nullId(item)
        if (itemId) {
          return [itemId, nullLabel(item)]
        }
      }
    }
    return [0, '']
  }, [value, items])

  const selectedItem: InputSelectItem | undefined = useMemo(() => {
    if (selectedId) {
      if (selectedLabel) {
        return { id: selectedId, toString: () => selectedLabel }
      }
      return { id: selectedId, toString: () => '...' }
    }
  }, [selectedId, selectedLabel])

  const handleChange = useCallback(
    ({ target: { value } }: SelectChangeEvent<InputSelectItemId>) => {
      onChange(items.find((it) => it.id === value))
    },
    [onChange, items]
  )

  const [isMenuOpen, setMenuOpen] = useState(false)
  const handleOpenMenu = useCallback(() => {
    setMenuOpen(true)
  }, [])

  const options = useMemo(() => {
    const newOptions: InputSelectItem[] = []
    emptyOption && newOptions.push({ id: 0, toString: () => 'Selecione' })
    items.length === 0 && selectedItem && newOptions.push(selectedItem)
    items.forEach((it) => newOptions.push(it))
    return newOptions
  }, [emptyOption, selectedItem, items])

  const input = (
    <>
      <Tooltip title={`${selectedLabel || placeholder}`}>
        <FormControl error={!!error} variant="outlined" fullWidth>
          {label && (
            <Label forId={id} error={!!error} required={required || false}>
              {label}
            </Label>
          )}
          <Select
            {...field}
            value={selectedId}
            onChange={handleChange}
            id={id}
            ref={ref}
            disabled={disabled}
            aria-describedby={helpId}
            size="small"
            fullWidth
            sx={{
              height: 40,
              '& .Mui-disabled': {
                backgroundColor: disabled ? '#F1F1F1' : '',
                WebkitTextFillColor: disabled ? '#1A1A1A !important' : ''
              },
              '& .MuiSelect-icon': {
                display: disabled ? 'none' : ''
              }
            }}
            displayEmpty
            open={isMenuOpen}
            onOpen={handleOpenMenu}
            onClose={() => setMenuOpen(false)}
            renderValue={(id: InputSelectItemId) => {
              if (!id) {
                return (
                  <Typography
                    variant="caption"
                    fontWeight={400}
                    fontSize={16}
                    color="#888888"
                  >
                    {placeholder}
                  </Typography>
                )
              }
              return truncateText && selectedLabel && selectedLabel.length > 30
                ? selectedLabel.substring(0, 30) + '...'
                : selectedLabel
            }}
          >
            {options.map((it) => (
              <MenuItem key={it.id} value={it.id}>
                {nullLabel(it)}
              </MenuItem>
            ))}
          </Select>
          {error && (
            <FormHelperText id={helpId}>{error.message}</FormHelperText>
          )}
        </FormControl>
      </Tooltip>
    </>
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

InputSelect.defaultProps = {
  required: false,
  disabled: false,
  emptyOption: true
}

export default InputSelect
