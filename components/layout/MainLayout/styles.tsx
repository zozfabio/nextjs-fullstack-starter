import Box, { BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material'

export const MainSection = styled(({ children, ...props }: BoxProps) => (
  <Box component="main" {...props}>
    {children}
  </Box>
))(() => ({
  flexGrow: 1
}))
