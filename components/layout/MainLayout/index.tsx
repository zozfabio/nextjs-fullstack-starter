import {
  FunctionComponent,
  MouseEvent,
  PropsWithChildren,
  useMemo,
  useState
} from 'react'

// eslint-disable-next-line no-restricted-imports
import { useSession, signOut } from 'next-auth/react'

import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import AppBar from '@mui/material/AppBar'
import Menu from '@mui/material/Menu'
import Avatar from '@mui/material/Avatar'
import MenuItem from '@mui/material/MenuItem'

import logo from 'assets/logos/logo.png'

import { Container } from '..'

import { MainSection } from './styles'
import Image from 'next/image'

const MainLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { data: session } = useSession()
  const avatarLetters = useMemo(() => {
    const names = session?.user?.name
      ?.replace(/\s{2,}/g, ' ') // remove two or more spaces
      .trim() // remove spaces around
      .split(' ')
    if (names) {
      let letters = `${names[0][0]}`
      if (names.length > 1) {
        letters = `${letters}${names[names.length - 1][0]}`
      }
      return letters.toLocaleUpperCase()
    }
    return 'U'
  }, [session])

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const handleLogout = () => {
    setAnchorElUser(null)
    signOut()
  }

  return (
    <>
      <AppBar
        position="static"
        variant="outlined"
        elevation={0}
        sx={{ bgcolor: 'background.paper' }}
      >
        <Container>
          <Toolbar disableGutters>
            <Image src={logo} alt="Logo" width={36} height={36} />
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 0, pl: 2 }}>
              <Tooltip title={session?.user?.name || 'User'}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={session?.user?.name || 'User'}>
                    {avatarLetters}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleLogout}>
                  <Typography>Sair</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <MainSection>{children}</MainSection>
    </>
  )
}

export default MainLayout
