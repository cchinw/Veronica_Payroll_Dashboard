import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import DashboardIcon from '@mui/icons-material/Dashboard'
import BadgeIcon from '@mui/icons-material/Badge'
import PaidIcon from '@mui/icons-material/Paid'
import AssessmentIcon from '@mui/icons-material/Assessment'
import DateRangeIcon from '@mui/icons-material/DateRange'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import PunchClockIcon from '@mui/icons-material/PunchClock'
import { useNavigate } from 'react-router'

const drawerWidth = 240

export default function Search(props) {
  const navigate = useNavigate()
  const { window } = props
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const [selectedIndex, setSelectedIndex] = useState(1)

  const drawer = (
    <div>
      <Toolbar />
      <TextField variant="outlined" color="secondary" label="Search..." />
      <Divider />
      <List component="nav" aria-label="main payroll folders">
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={() => navigate('/')}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === 1}
          onClick={() => navigate('/employees')}
        >
          <ListItemIcon>
            <BadgeIcon />
          </ListItemIcon>
          <ListItemText primary="Employees" />
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === 1}
          onClick={() => navigate('/schedules')}
        >
          <ListItemIcon>
            <DateRangeIcon />
          </ListItemIcon>
          <ListItemText primary="Scheduler" />
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === 1}
          onClick={() => navigate('/payroll')}
        >
          <ListItemIcon>
            <PaidIcon />
          </ListItemIcon>
          <ListItemText primary="Payroll" />
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === 1}
          onClick={() => navigate('/report')}
        >
          <ListItemIcon>
            <AssessmentIcon />
          </ListItemIcon>
          <ListItemText primary="Report" />
        </ListItemButton>
      </List>

      <Divider />
      <List component="nav" aria-label="secondary mailbox folder">
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={() => navigate('/employee')}
        >
          <ListItemIcon>
            <GroupAddIcon />
          </ListItemIcon>
          <ListItemText primary="Add Employees" />
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === 1}
          onClick={() => navigate('/schedule')}
        >
          <ListItemIcon>
            <PunchClockIcon />
          </ListItemIcon>
          <ListItemText primary="Create Schedule" />
        </ListItemButton>
      </List>
    </div>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` }
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Veronica's Payroll Management System
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` }
        }}
      >
        <Toolbar />
      </Box>
    </Box>
  )
}
