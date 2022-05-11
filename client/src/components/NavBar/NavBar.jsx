import React, { useEffect, useState } from 'react'
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Autocomplete, Button, Chip, Grid, TextField } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionLogOut } from '../../store/actionCreators/auth';
import decode from 'jwt-decode';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LocalPicker from './localePicker/LocalePicker'
import { ColorModeContext } from '../../App'
import { searchItem } from '../../api';
import { useIntl } from 'react-intl';
import SearchIcon from '@mui/icons-material/Search';




import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import PagesButton from './PagesButton';
import SearchField from './SearchField';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(Autocomplete)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const NavBar = ({ currentLocale, setCurrentLocale }) => {
    const [foundItems, setFoundItems] = useState([])

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const location = useLocation();
    const { messages } = useIntl()

    const handleLogOut = () => {
        dispatch(actionLogOut());
        setUser(null)
        navigate('/login');
    }

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

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ padding: '10px 0' }}>
                <Toolbar style={{ justifyContent: 'space-between', }}>
                    <Grid container spacing={2} alignItems='center'>
                        <Grid item>
                            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <LocalPicker currentLocale={currentLocale} onLocaleChanged={setCurrentLocale} />
                        </Grid>
                        <Grid item >
                            <PagesButton />
                        </Grid>
                    </Grid>

                    <Box sx={{ position: 'absolute', left: '50%', top: 0 }}>
                        <SearchField foundItems={foundItems} findItems={findItems} />
                    </Box>
                    <Box >
                        {
                            user ?
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Chip label={user?.result?.email} style={{ color: "white", backgroundColor: "#000", borderRadius: '10px', padding: '8px 15px' }} />
                                    <Button variant="text" style={{ color: 'white', padding: '8px 15px' }} onClick={handleLogOut}>
                                        {messages['nav.logout']}
                                    </Button>
                                </Box>
                                :
                                <Box sx={{ display: 'flex', }}>
                                    <Button variant="text" color="secondary" style={{ padding: '0' }}>
                                        <Link to='/login' style={{ color: 'white', }} >
                                            {messages['nav.login']}
                                        </Link>
                                    </Button>
                                    <Button variant="text" color="secondary" style={{ padding: '0' }}>
                                        <Link to='/sign-up' style={{ color: 'white', padding: '8px 15px' }}>
                                            {messages['nav.signup']}
                                        </Link>
                                    </Button>
                                </Box>
                        }

                    </Box>

                </Toolbar >
            </AppBar >
        </Box >
    )
}

// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

// const NavBar = () => {
//     const { messages } = useIntl()
//     const [anchorElNav, setAnchorElNav] = React.useState(null);
//     const [anchorElUser, setAnchorElUser] = React.useState(null);
//     const pages = [`${messages['nav.home']}`, `${messages['nav.admin']}`, `${messages['nav.profile']}`];

//     const [foundItems, setFoundItems] = useState([])

//     const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
//     const theme = useTheme();
//     const colorMode = React.useContext(ColorModeContext);
//     const navigate = useNavigate()
//     const dispatch = useDispatch();
//     const location = useLocation();


//     const handleLogOut = () => {
//         dispatch(actionLogOut());
//         setUser(null)
//         navigate('/login');
//     }

//     useEffect(() => {
//         const token = user?.token;

//         if (token) {
//             const decodedToken = decode(token);

//             if (decodedToken.exp * 1000 < new Date().getTime()) handleLogOut();
//         }

//         setUser(JSON.parse(localStorage.getItem('profile')));
//     }, [location]);

//     const findItems = async (event) => {
//         try {
//             const response = await searchItem({ searchedData: event.target.value })
//             setFoundItems(response.data);
//         } catch (error) {
//             console.log(error);
//         }

//     };


//     const handleOpenNavMenu = (event) => {
//         setAnchorElNav(event.currentTarget);
//     };
//     const handleOpenUserMenu = (event) => {
//         setAnchorElUser(event.currentTarget);
//     };

//     const handleCloseNavMenu = () => {
//         setAnchorElNav(null);
//     };

//     const handleCloseUserMenu = () => {
//         setAnchorElUser(null);
//     };

//     return (
//         <AppBar position="static">
//             <Container maxWidth="xl">
//                 <Toolbar disableGutters>


//                     <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//                         <IconButton
//                             size="large"
//                             aria-label="account of current user"
//                             aria-controls="menu-appbar"
//                             aria-haspopup="true"
//                             onClick={handleOpenNavMenu}
//                             color="inherit"
//                         >
//                             <MenuIcon />
//                         </IconButton>
//                         {/* <Menu
//                             id="menu-appbar"
//                             anchorEl={anchorElNav}
//                             anchorOrigin={{
//                                 vertical: 'bottom',
//                                 horizontal: 'left',
//                             }}
//                             keepMounted
//                             transformOrigin={{
//                                 vertical: 'top',
//                                 horizontal: 'left',
//                             }}
//                             open={Boolean(anchorElNav)}
//                             onClose={handleCloseNavMenu}
//                             sx={{
//                                 display: { xs: 'block', md: 'none' },
//                             }}
//                         > */}
//                             <PagesButton />
//                         {/* </Menu> */}
//                     </Box>

//                     {/* <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}> */}
//                     <SearchField foundItems={foundItems} findItems={findItems} />
//                     {/* </Box> */}

//                     <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

//                     </Box>

//                     <Box sx={{ flexGrow: 0 }}>
//                         <Tooltip title="Open settings">
//                             <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                                 <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
//                             </IconButton>
//                         </Tooltip>
//                         <Menu
//                             sx={{ mt: '45px' }}
//                             id="menu-appbar"
//                             anchorEl={anchorElUser}
//                             anchorOrigin={{
//                                 vertical: 'top',
//                                 horizontal: 'right',
//                             }}
//                             keepMounted
//                             transformOrigin={{
//                                 vertical: 'top',
//                                 horizontal: 'right',
//                             }}
//                             open={Boolean(anchorElUser)}
//                             onClose={handleCloseUserMenu}
//                         >
//                             {settings.map((setting) => (
//                                 <MenuItem key={setting} onClick={handleCloseUserMenu}>
//                                     <Typography textAlign="center">{setting}</Typography>
//                                 </MenuItem>
//                             ))}
//                         </Menu>
//                     </Box>
//                 </Toolbar>
//             </Container>
//         </AppBar>
//     );
// };

export default NavBar