import { FunctionComponent, PropsWithChildren } from 'react'

import MuiContainer from '@mui/material/Container'

const Container: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <MuiContainer maxWidth={false}>{children}</MuiContainer>
)

export default Container
