import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Theme personalization of Material UI
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

// CSS & Drawer
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';

// Nav Bar
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

// Material Lists
import List from '@mui/material/List';

// Icons
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';

// Material Grids & Box
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

// List for the menu
import MenuItems from './MenuItems';
import NewEditor from '../editor/NewEditor';
// import Tiptap from '../editor/Tiptap';
// import { FileUploader } from '../uploader/FileUploader';

// Width for Drawer Menu
const drawerWidth: number = 240;

// Drawer Menu
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing(7),
        // Breakpoint to Media Queries of CSS in different display sizes (Responsive Design)
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9)
        }
      })
    }
  })
);

// Define Theme
const myTheme = createTheme();

// Dashboard content
// TODO: Refactor with Navigation Components
const Dashboard = () => {
  const [open, setOpen] = useState(true);

  const navigate = useNavigate();

  // Show / Hide Drawer Menu
  const toggleDrawer = () => {
    setOpen(!open);
  }

  const logout = () => {
    // Eliminar el token del sessionStorage
    sessionStorage.removeItem('sessionJWTToken');

    // Redirigir al usuario a la página de inicio de sesión o a donde desees
    navigate('/login');
  };

  return (

    <ThemeProvider theme={myTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        {/* AppBar */}
        <AppBar component="nav">
          {/* Toolbar --> Actions */}
          <Toolbar sx={{ pr: '24px' }}>
            {/* ICON TO TOGGLE DRAWER MENU */}
            <IconButton
              edge='start'
              color='inherit'
              aria-label='open drawer'
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && {
                  display: 'none'
                })
              }}
            >
              <MenuIcon />
            </IconButton>
            {/* Title of App */}
            <Typography
              component='h1'
              variant='h6'
              color='inherit'
              noWrap
              sx={{
                flexGrow: 1
              }}
            >
              Code Verification Katas
            </Typography>
            {/* ICON to show Notifications */}
            <IconButton color='inherit'>
              <Badge badgeContent={10} color='error'>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            {/* ICON to Logout */}
            <IconButton color='inherit' onClick={logout}>
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant='permanent' open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1]
            }}
          >
            {/* ICON to HIDE the Menu */}
            <IconButton color='inherit' onClick={toggleDrawer}>
              {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </Toolbar>
          <Divider />
          {/* List of menu items */}
          <List component='nav'>
            <MenuItems />
          </List>
        </Drawer>
        {/* Dashboard Content */}
        <Box
          component='main'
          sx={{
            backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto'
          }}
        >
          {/* Toolbar */}
          <Toolbar />
          {/* Contanier with the content */}
          {/* TODO: Change for the Navigation Content by URL and Stack of Routes */}
          <Container maxWidth='lg' sx={{ mt: 4, mg: 4 }}>
            <Grid item xs={12} md={12} lg={12}>
              <Paper sx={{
                display: 'flex',
                flexDirection: 'column',
                height: 400
              }}>
                {/* Code Editor */}
                <NewEditor />
                {/* <Tiptap /> */}
                {/* File Uploader */}
                {/* <FileUploader /> */}
              </Paper>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider >
  )
}

export default Dashboard;
