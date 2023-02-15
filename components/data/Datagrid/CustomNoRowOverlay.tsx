import { Box, Typography } from '@mui/material'

const CustomNoRowOverlay = () => {
  return (
    <Box height={1} display="flex" alignItems="center" justifyContent="center">
      <Typography variant="subtitle2" fontWeight={700} fontSize={16}>
        Sem registros para exibir
      </Typography>
    </Box>
  )
}

export default CustomNoRowOverlay
