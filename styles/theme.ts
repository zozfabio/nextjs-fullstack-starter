import { createTheme } from '@mui/material'
import type {} from '@mui/x-date-pickers/themeAugmentation'

const theme = createTheme({
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: ['Montserrat' /* , 'Chilanka' */].join(', ')
  }
})

export default theme
