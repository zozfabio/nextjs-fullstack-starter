import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

export const StyledRoot = styled(Box)(
  ({ theme: { typography, palette, shape, spacing } }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: typography.fontFamily,
    backgroundColor: palette.common.white,
    borderRadius: +shape.borderRadius / 2,
    padding: spacing(0.5, 1.5),
    border: '1px solid #dcdcdc',
    height: '40px',
    '&:hover': {
      borderColor: '#6677B9'
    },
    '&.Mui-focused': {
      borderColor: '#6677B9'
    },
    '&.Mui-error': {
      borderColor: '#e21a4c'
    }
  })
)

export const StyledInput = styled('input')(
  ({ theme: { typography, palette, spacing } }) => ({
    fontSize: typography.fontSize,
    fontFamily: typography.fontFamily,
    backgroundColor: `transparent !important`,
    flexGrow: 1,
    padding: `${spacing(0.5)}`,
    border: 'none',
    outline: 0,
    '&:focus': {
      backgroundColor: `transparent !important`
    },
    '&:active': {
      backgroundColor: `transparent !important`
    }
  })
)
