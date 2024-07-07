import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { MenuItem } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useDispatch } from 'react-redux';
import { removeAuthToken } from '../../../../feature/auth/AuthSlice';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from 'react-router-dom';
import usePermissionCheck from '../../../../hook/usePermissionCheck';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Sidebar() {
  const location = useLocation();
  React.useEffect(()=>{
    const path = location.pathname;
    const lastSegment = path.substring(path.lastIndexOf('/') + 1);
    setIsActive(lastSegment)
  },[])
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [isActive, setIsActive] = React.useState('Home');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(removeAuthToken())
    navigate('/')

  }
  const handleActiveTab = (tab) => {
    setIsActive(tab);
  }
  const {checkPermission}=usePermissionCheck();
  const hasPermissionUserManagement=checkPermission('View|User Management')
  const hasPermissionRolePermission=checkPermission('View|Role And Permission')

  const navLinks=[
    {to:'/dashboard', label:'Home',icon:<HomeIcon/> ,name:'dashboard'},
    hasPermissionRolePermission &&{to:'/dashboard/role-permission', label:'Role and Permission',icon:<LockIcon/> ,name:'role-permission'},
    hasPermissionUserManagement && { to:'/dashboard/user-management', label:'User Management',icon:<PersonIcon/>, name:'user-management'},
  ].filter(Boolean);
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box display="flex" justifyContent="space-between" width="100%" p={2}>
            <Typography variant="h6" noWrap component="div">
              Dashboard
            </Typography>
            <Box display="flex">
              <MenuItem >My account</MenuItem>
              <MenuItem >Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>

            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <List>
          {
            navLinks.map((nav,i)=>(
              <ListItem disablePadding sx={{ display: 'block' }} key={i}>
              <ListItemButton
              to={nav.to}
                component={Link}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  backgroundColor: isActive ==nav.name? '#1976d2' : '', 
                  '&:hover': {
                    backgroundColor: isActive ==nav.name? '#1976d2':"",
                  },
                  color:isActive ==nav.name? 'white':''
  
                }}
                onClick={() => handleActiveTab(nav.name)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {nav.icon}
                </ListItemIcon>
                <ListItemText primary={nav.label} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            ))
          }
        </List>

      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
