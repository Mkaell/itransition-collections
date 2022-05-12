import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import decode from 'jwt-decode';
import SearchField from './SearchField';
import { Link as RouterLink, useLocation, useNavigate, } from 'react-router-dom';
import { Grid, Link, useTheme } from '@mui/material';
import PagesButton from './NavigationButton';
import NavigationButton from './NavigationButton';
import AuthButton from './AuthButton';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { actionLogOut } from '../../store/actionCreators/auth';
import { ColorModeContext } from '../../App'
import { searchItem } from '../../api';
import LocalePicker from './localePicker/LocalePicker';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = ({ currentLocale, setCurrentLocale }) => {

    const [foundItems, setFoundItems] = useState([])
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const location = useLocation();


    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) handleLogOut();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const findItems = async (event) => {
        try {
            const response = await searchItem({ searchedData: event.target.value })
            setFoundItems(response.data);
        } catch (error) {
            console.log(error);
        }

    };
    const handleLogOut = () => {
        dispatch(actionLogOut());
        setUser(null)
        navigate('/login');
    }

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between', }}>
                    <Box sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        width: { md: '300px' },

                    }}>
                        <SearchField foundItems={foundItems} findItems={findItems} />
                    </Box>

                    <Box sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        alignItems: 'center',
                    }}>
                        <IconButton sx={{ mr: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                        <LocalePicker currentLocale={currentLocale} onLocaleChanged={setCurrentLocale} />
                    </Box>
                    <Box sx={{
                        flexGrow: { xs: '0' },
                        display: { xs: 'flex', md: 'none' },
                        flexDirection: { xs: 'column' },
                        mr: 2,
                    }}>

                        <IconButton sx={{ mr: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                        <LocalePicker currentLocale={currentLocale} onLocaleChanged={setCurrentLocale} />

                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <NavigationButton handleCloseNavMenu={handleCloseNavMenu} />
                        </Menu>
                    </Box>

                    <Box sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: { xs: 1, sm: 0.7, md: 1 },
                    }}>
                        <SearchField foundItems={foundItems} findItems={findItems} />
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <NavigationButton handleCloseNavMenu={handleCloseNavMenu} />
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <AuthButton handleCloseUserMenu={handleCloseUserMenu} handleLogOut={handleLogOut} />
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    );
};
export default ResponsiveAppBar;
