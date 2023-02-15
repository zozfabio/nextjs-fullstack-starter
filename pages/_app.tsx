import { FunctionComponent } from 'react'

import type { AppProps } from 'next/app'
import Head from 'next/head'

import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {
  RoutesProvider,
  RouteConfirmationProvider
} from 'components/navigation'
import { AuthPage } from 'components/auth'

import theme from 'styles/theme'

import { SessionProvider } from 'next-auth/react'

import routes from 'routes'

import 'styles/globals.css'

type CustomAppProps = AppProps & {
  Component: AppProps['Component'] & {
    auth?: {
      isPublic?: boolean
    }
  }
}

const App: FunctionComponent<CustomAppProps> = ({
  Component,
  pageProps: { session, ...pageProps }
}) => {
  return (
    <>
      <Head>
        <title>My App</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RoutesProvider routes={routes}>
          <RouteConfirmationProvider>
            <Box display="flex" flexDirection="column" height="100vh">
              {Component.auth?.isPublic ? (
                <Component {...pageProps} />
              ) : (
                <SessionProvider
                  session={session}
                  refetchInterval={10 * 60 /* 10min */}
                >
                  <AuthPage>
                    <Component {...pageProps} />
                  </AuthPage>
                </SessionProvider>
              )}
            </Box>
          </RouteConfirmationProvider>
        </RoutesProvider>
      </ThemeProvider>
      <ToastContainer
        autoClose={2000}
        position="bottom-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

export default App
