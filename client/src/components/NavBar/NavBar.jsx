import React from 'react'
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

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

const StyledInputBase = styled(InputBase)(({ theme }) => ({
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
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar style={{ justifyContent: 'space-between' }}>
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
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box sx={{ alignItems: 'end' }}>
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
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default NavBar