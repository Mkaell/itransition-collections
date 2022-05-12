import React from 'react'
import Box from '@mui/material/Box';
import { Button, Chip, MenuItem } from '@mui/material';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AuthButton = ({ handleLogOut, handleCloseUserMenu }) => {
    const { messages } = useIntl();
    const user = useSelector(state => state.auth.authData?.result);
    return (
        <>
            {
                user ?
                    <MenuItem onClick={handleCloseUserMenu} sx={{ justifyContent: 'center' }}>
                        <Button variant="text" style={{ color: 'white', padding: '8px 15px' }} onClick={handleLogOut}>
                            {messages['nav.logout']}
                        </Button>
                    </MenuItem>
                    :
                    <>
                        <MenuItem onClick={handleCloseUserMenu} sx={{ justifyContent: 'center' }}>
                            <Link to='/login' style={{ color: 'white', }} >
                                {messages['nav.login']}
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleCloseUserMenu} sx={{ justifyContent: 'center' }}>
                            <Link to='/sign-up' style={{ color: 'white', padding: '8px 15px' }}>
                                {messages['nav.signup']}
                            </Link>
                        </MenuItem>
                    </>
            }
        </>
    )
}

export default AuthButton