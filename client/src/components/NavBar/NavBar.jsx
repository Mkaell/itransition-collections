import React, { useEffect, useState } from 'react'
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, Button, Chip, TextField } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionLogOut } from '../../store/actionCreators/auth';
import decode from 'jwt-decode';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { ColorModeContext } from '../../App'
import { searchItem } from '../../api';

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

const NavBar = () => {
    const [foundItems, setFoundItems] = useState([])
    console.log(foundItems);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const location = useLocation();

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
            <AppBar position="static">
                <Toolbar style={{ justifyContent: 'space-between' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: 'background.default',
                            color: 'text.primary',
                            borderRadius: 1,
                            p: 3,
                        }}
                    >
                        {theme.palette.mode} mode
                        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                    </Box>
                    <Box sx={{ alignItems: 'start' }}>
                        {
                            user?.result?.role ?
                                <>
                                    <Button variant="contained" color="secondary" style={{ padding: '0' }}>
                                        <Link to='/' style={{ color: 'white', padding: '8px 15px' }}>
                                            Home
                                        </Link>
                                    </Button>
                                    <Button variant="contained" color="secondary" style={{ padding: '0' }}>
                                        <Link to='/admin' style={{ color: 'white', padding: '8px 15px' }}>
                                            Admin
                                        </Link>
                                    </Button>
                                    <Button variant="contained" color="secondary" style={{ padding: '0' }}>
                                        <Link to='/profile' style={{ color: 'white', padding: '8px 15px' }}>
                                            Profile
                                        </Link>
                                    </Button>
                                </> :
                                user ?

                                    <>
                                        <Button Button variant="contained" color="secondary" style={{ padding: '0' }}>
                                            <Link to='/' style={{ color: 'white', padding: '8px 15px' }}>
                                                Home
                                            </Link>
                                        </Button>
                                        <Button variant="contained" color="secondary" style={{ padding: '0' }}>
                                            <Link to='/profile' style={{ color: 'white', padding: '8px 15px' }}>
                                                Profile
                                            </Link>
                                        </Button>
                                    </> :
                                    <Button variant="contained" color="secondary" style={{ padding: '0' }}>
                                        <Link to='/' style={{ color: 'white', padding: '8px 15px' }}>
                                            Home
                                        </Link>
                                    </Button>
                        }
                    </Box>

                    {/* <Search> */}
                    {/* <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper> */}

                    <Autocomplete
                        sx={{ width: 300 }}
                        id="free-solo-2-demo"
                        options={foundItems}
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        filterOptions={(x) => x}
                        getOptionLabel={(option) =>
                            option.name
                        }
                        renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props} key={option._id}>
                                {option.name} ({option._id})
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Search input"
                                onChange={(e) => findItems(e)}
                            // InputProps={{
                            //     ...params.InputProps,

                            // }}
                            />
                        )}
                    />

                    {/* </Search> */}
                    <Box sx={{ alignItems: 'end' }}>
                        {
                            user ?
                                <>
                                    <Chip label={user?.result?.email} style={{ color: "white", backgroundColor: "#000", borderRadius: '10px' }} />
                                    <Button variant="contained" color="secondary" style={{ padding: '0' }} onClick={handleLogOut}>
                                        log Out
                                    </Button>
                                </>
                                :
                                <>
                                    <Button variant="contained" color="secondary" style={{ padding: '0' }}>
                                        <Link to='/login' style={{ color: 'white', padding: '8px 15px' }} >
                                            Log in
                                        </Link>
                                    </Button>
                                    <Button variant="contained" color="secondary" style={{ padding: '0' }}>
                                        <Link to='/sign-up' style={{ color: 'white', padding: '8px 15px' }}>
                                            Sign Up
                                        </Link>
                                    </Button>
                                </>
                        }
                    </Box>
                </Toolbar >
            </AppBar >
        </Box >
    )
}

export default NavBar