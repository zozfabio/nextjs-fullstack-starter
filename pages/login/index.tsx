/* eslint-disable no-restricted-imports */

import type { GetServerSideProps } from 'next'

import { getCsrfToken } from 'next-auth/react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material'

import { InputUsername, InputPassword } from 'components/form'

import { useTranslate } from 'locale'

type ILoginPage = CustomNextPage<{
  csrfToken?: string
}>

const LoginPage: ILoginPage = ({ csrfToken }) => {
  const { palette } = useTheme()
  const t = useTranslate('login')
  return (
    <Grid container direction="row" justifyContent="center">
      <Box>
        <Typography
          mt={6}
          mb={4}
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          color={palette.grey[700]}
        >
          {t('title')}
        </Typography>
        <form method="post" action="/api/auth/callback/credentials">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <Grid container spacing={4}>
            <InputUsername
              name="username"
              label={t('field.username.label')}
              placeholder={t('field.username.placeholder')}
              autoFocus
              xs={12}
            />
            <InputPassword
              name="password"
              label={t('field.password.label')}
              placeholder={t('field.password.placeholder')}
              xs={12}
            />
            <Grid item container xs={12}>
              <Link
                ml="auto"
                rel="noreferrer"
                color={palette.grey[700]}
                variant="body2"
                onClick={() => {}}
              >
                {t('link.forgottenPassword')}
              </Link>
            </Grid>
            <Grid
              item
              xs={12}
              container
              direction="row"
              justifyContent="flex-end"
            >
              <Button variant="contained" color="primary" type="submit">
                {t('button.confirm')}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Grid>
  )
}

LoginPage.auth = {
  isPublic: true
}

export default LoginPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      csrfToken: await getCsrfToken(context)
    }
  }
}
