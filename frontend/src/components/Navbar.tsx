import * as React from "react";

//import AppBar from "@mui/material/AppBar";

import Box from "@mui/material/Box";

import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";

import { Link as RouterLink } from "react-router-dom";


//import Users from "./components/Users";

//icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

//เมนูแถบ
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox'; //ไม่ได้ใช้
import MailIcon from '@mui/icons-material/Mail';

//ไอคอน 
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import EventNoteIcon from '@mui/icons-material/EventNote';
import HealingIcon from '@mui/icons-material/Healing';
import { MenuItem } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

//สี
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green } from '@mui/material/colors';

//Container
import Container from '@mui/material/Container';

//paper
import Paper from '@mui/material/Paper';

//Grid
import Grid from '@mui/material/Grid';

//text
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

//Button
import Button from '@mui/material/Button';

//Datetime
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


//สี
const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: green[400],
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#e8f5e9',
    },
  },
});

const drawerWidth = 320; //ความยาวของ แถบเมนู

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const menu = [
  { name: "ระบบยืมเครื่องมือแพทย์", icon: <HomeRepairServiceIcon  />, path: "/Borrow" },
  { name: "ระบบจัดการข้อมูลแพทย์", icon: <ManageAccountsIcon  />, path: "/Manaagemed" },
  { name: "ระบบบันทึกข้อมูลล่วงเวลา", icon: <PendingActionsIcon   />, path: "/Overtiome" },
  { name: "ระบบผู้ป่วยในการดูแลของแพทย์", icon: <HealingIcon  />, path: "/Patient" },
  { name: "ระบบตารางเวลาแพทย์", icon: <CalendarMonthIcon  />, path: "/Schedule" },
  { name: "ระบบลาพักงานของแพทย์", icon: <EventNoteIcon />, path: "/Takeleave" },
]



function Navbar() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-07'));

  const themep = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const SignOut = () => {
    localStorage.clear();
    window.location.href = "/";
  }
  return (
    <div>
    <ThemeProvider theme={theme}>
    <Box sx={{ flexGrow: 1 }}>
    <CssBaseline />
    <AppBar position="fixed" open={open}>
 
        <Toolbar>
 
          <IconButton
 
            color="secondary"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
                component="h1"
                variant="h6"
                color="secondary"
                noWrap
                sx={{ flexGrow: 1 }}
              >
            ระบบข้อมูลแพทย์
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          {/* ปุ่มกด < */}
          <IconButton onClick={handleDrawerClose}> 
            {themep.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton> {/* ปุ่มกด < */}
        </DrawerHeader>

        <Divider />

         {menu.map((item, index) => (
                <ListItem key={index} button component={RouterLink} to={item.path}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText>{item.name}</ListItemText>
                  
                </ListItem>
              ))}

        <Divider />
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
    </ThemeProvider>
  </div>
 
  );
 
 }

export default Navbar;
