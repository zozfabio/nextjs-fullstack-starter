import Tabs, { TabsProps } from '@mui/material/Tabs'
import Tab, { TabProps } from '@mui/material/Tab'
import { styled } from '@mui/material'

export const StyledTabs = styled((props: TabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))(({ theme }) => ({
  minHeight: 60,
  backgroundColor: theme.palette.primary.main,
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    padding: theme.spacing(0, 2, 0, 5)
  },
  '& .MuiTabs-indicatorSpan': {
    width: '100%',
    backgroundColor: theme.palette.primary.main
  }
}))

export const StyledTab = styled((props: TabProps) => <Tab {...props} />)(
  ({ theme }) => ({
    fontWeight: 200,
    color: theme.palette.common.white,
    minHeight: 60,
    backgroundColor: theme.palette.primary.main,
    marginLeft: 25,
    marginRight: 18,
    opacity: 0.9,
    '&.Mui-selected': {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.common.white,
      fontWeight: 600
    }
  })
)
