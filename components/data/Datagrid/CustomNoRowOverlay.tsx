import { Box, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

const CustomNoRowOverlay = () => {
  const { t } = useTranslation('dataGridCrud')

  return (
    <Box height={1} display="flex" alignItems="center" justifyContent="center">
      <Typography variant="subtitle2" fontWeight={700} fontSize={16}>
        {t('noDataLabel')}
      </Typography>
    </Box>
  )
}

export default CustomNoRowOverlay
