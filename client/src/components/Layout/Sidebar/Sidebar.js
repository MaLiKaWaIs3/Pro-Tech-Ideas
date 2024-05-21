// import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { NavLink, useLocation } from 'react-router-dom'
import React, { useContext } from 'react';
import { UserContext } from '../../../Context/UserContext'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import RateReviewIcon from '@mui/icons-material/RateReview';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import styles from './Sidebar.module.css'
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import { SearchOffOutlined } from '@mui/icons-material';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

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

    [theme.breakpoints.up('xs')]: {
        width: 0,
    },
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


export default function Sidebar({ open, handleDrawerClose, handleDrawerOpen }) {

    let selectedItem = useLocation().pathname.split('/')[1]
    // console.log(selectedItem);

    const { isLoggedIn, currentUser, signOutUser } = useContext(UserContext);

    const [openUserCollapse, setOpenUseCollapse] = React.useState(false);

    const theme = useTheme();

    function handleUserClicked() {
        setOpenUseCollapse(!openUserCollapse);
    }

    function handleMouseLeavesDrawer() {
        setOpenUseCollapse(false);
        handleDrawerClose()
    }

    React.useEffect(() => {

    }, [selectedItem])


    return (
        <Drawer className={styles.sidebar} variant="permanent" open={open} onMouseEnter={handleDrawerOpen} onMouseLeave={handleMouseLeavesDrawer} PaperProps={{ sx: { backgroundColor: '#000', color: 'white' } }}>
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {/* {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />} */}
                    <MenuIcon style={{ color: '#fff' }} />
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                <ListItem key={"Dashboard"} disablePadding sx={{ display: 'block' }}>
                    {/* <NavLink to="/" style={{ textDecoration: 'none', color: 'white' }} > */}
                    <ListItemButton
                        selected={!selectedItem ? true : false}
                        component={NavLink}
                        to="/"
                        style={{ textDecoration: 'none', color: 'white' }}
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                            "&.Mui-selected": {
                                backgroundColor: "#2e80bf",
                            },
                            "&.Mui-selected:hover": {
                                backgroundColor: "#2e80bf",
                            },
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                                color: '#fff'
                            }}
                        >
                            <DashboardOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Dashboard"} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                    {/* </NavLink> */}
                </ListItem>
                {currentUser.userType === "Admin" && <Divider />}
                {currentUser.userType === "Admin" && <ListItem key={"Ideas"} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        component={NavLink}
                        to="/ideatoreview"
                        style={{ textDecoration: 'none', color: 'white' }}
                        selected={selectedItem === "ideatoreview" ? true : false}
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                            "&.Mui-selected": {
                                backgroundColor: "#2e80bf",
                            },
                            "&.Mui-selected:hover": {
                                backgroundColor: "#2e80bf",
                            },
                        }}
                        onClick={handleUserClicked}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <RateReviewIcon style={{ color: '#fff' }} />
                        </ListItemIcon>
                        <ListItemText primary={"Ideas"} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>}

                { currentUser.userType === "Expert" && <ListItem key={"Idea to Review"}disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        component={NavLink}
                        to="/ideas"
                        style={{ textDecoration: 'none', color: 'white' }}
                        selected={selectedItem === "ideatoreview" ? true : false}
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                            "&.Mui-selected": {
                                backgroundColor: "#2e80bf",
                            },
                            "&.Mui-selected:hover": {
                                backgroundColor: "#2e80bf",
                            },
                        }}
                        onClick={handleUserClicked}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <EmojiObjectsIcon style={{ color: '#fff' }} />
                        </ListItemIcon>
                        <ListItemText primary={"Idea to Review"} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>}
                { currentUser.userType === "Student" && <ListItem key={"Your Ideas" }disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        component={NavLink}
                        to="/ideas"
                        style={{ textDecoration: 'none', color: 'white' }}
                        selected={selectedItem === "ideatoreview" ? true : false}
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                            "&.Mui-selected": {
                                backgroundColor: "#2e80bf",
                            },
                            "&.Mui-selected:hover": {
                                backgroundColor: "#2e80bf",
                            },
                        }}
                        onClick={handleUserClicked}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <EmojiObjectsIcon style={{ color: '#fff' }} />
                        </ListItemIcon>
                        <ListItemText primary={"Your Ideas"} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>}
                { currentUser.userType === "Student" && <ListItem key={"Project Ideas" }disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        component={NavLink}
                        to="/projectideas"
                        style={{ textDecoration: 'none', color: 'white' }}
                        selected={selectedItem === "ideatoreview" ? true : false}
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                            "&.Mui-selected": {
                                backgroundColor: "#2e80bf",
                            },
                            "&.Mui-selected:hover": {
                                backgroundColor: "#2e80bf",
                            },
                        }}
                        onClick={handleUserClicked}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <SearchOffOutlined style={{ color: '#fff' }} />
                        </ListItemIcon>
                        <ListItemText primary={"Project Ideas"} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>}
                {currentUser.userType === "Student" && <ListItem key={"Post Idea"} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        component={NavLink}
                        to="/uploadideas"
                        style={{ textDecoration: 'none', color: 'white' }}
                        selected={selectedItem === "ideatoreview" ? true : false}
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                            "&.Mui-selected": {
                                backgroundColor: "#2e80bf",
                            },
                            "&.Mui-selected:hover": {
                                backgroundColor: "#2e80bf",
                            },
                        }}
                        onClick={handleUserClicked}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <CloudUploadIcon style={{ color: '#fff' }} />
                        </ListItemIcon>
                        <ListItemText primary={"Post Idea"} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>}
              
                {currentUser.userType === "Admin" && <Divider />}
                {currentUser.userType === "Admin" && <ListItem key={"Users"} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        component={NavLink}
                        to="/users"
                        style={{ textDecoration: 'none', color: 'white' }}
                        selected={selectedItem === "users" ? true : false}
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                            "&.Mui-selected": {
                                backgroundColor: "#2e80bf",
                            },
                            "&.Mui-selected:hover": {
                                backgroundColor: "#2e80bf",
                            },
                        }}
                        onClick={handleUserClicked}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <GroupsIcon style={{ color: '#fff' }} />
                        </ListItemIcon>
                        <ListItemText primary={"Users"} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>}
              
                {currentUser.userType === "Admin" && <ListItem key={"Students"} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        component={NavLink}
                        to="/students"
                        style={{ textDecoration: 'none', color: 'white' }}
                        selected={selectedItem === "patients" ? true : false}
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                            "&.Mui-selected": {
                                backgroundColor: "#2e80bf",
                            },
                            "&.Mui-selected:hover": {
                                backgroundColor: "#2e80bf",
                            },
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <PersonIcon style={{ color: '#fff' }} />
                        </ListItemIcon>
                        <ListItemText primary={"Students"} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
                }
                {currentUser.userType === "Admin" && <ListItem key={"Experts"} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        component={NavLink}
                        to="/experts"
                        style={{ textDecoration: 'none', color: 'white' }}
                        selected={selectedItem === "doctors" ? true : false}
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                            "&.Mui-selected": {
                                backgroundColor: "#2e80bf",
                            },
                            "&.Mui-selected:hover": {
                                backgroundColor: "#2e80bf",
                            },
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <PeopleIcon style={{ color: '#fff' }} />
                        </ListItemIcon>
                        <ListItemText primary={"Experts"} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
                }
            </List>
            <Divider />
            <List>
                <ListItem key={"Profile"} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        component={NavLink}
                        to="/profile"
                        style={{ textDecoration: 'none', color: 'white' }}
                        selected={selectedItem === "profile" ? true : false}
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                            "&.Mui-selected": {
                                backgroundColor: "#2e80bf",
                            },
                            "&.Mui-selected:hover": {
                                backgroundColor: "#2e80bf",
                            },
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <AccountBoxIcon style={{ color: '#fff' }} />
                        </ListItemIcon>
                        <ListItemText primary={"Profile"} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
            </List>

            <Divider />
            <List>
                <ListItem key={"Logout"} disablePadding sx={{ display: 'block' }} onClick={signOutUser}>
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <LogoutOutlinedIcon style={{ color: '#fff' }} />
                        </ListItemIcon>
                        <ListItemText primary={"Logout"} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
}