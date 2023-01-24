import { FunctionComponent } from 'react'

import Typography from '@mui/material/Typography'

import { useTranslate } from 'locale'

const Dashboard: FunctionComponent = () => {
  const t = useTranslate('dashboard')
  return (
    <>
      <Typography variant="subtitle1">{t('message')}</Typography>
    </>
  )
}

export default Dashboard
