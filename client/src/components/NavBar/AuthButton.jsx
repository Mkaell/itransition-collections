import React from 'react'
import { Button, Chip, MenuItem } from '@mui/material';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { StyledLink } from './style';

const AuthButton = ({ handleLogOut, handleCloseUserMenu }) => {

    const { messages } = useIntl();
    const user = useSelector(state => state.auth.authData?.result);

    return (
        <>
            {
                user ?
                    <MenuItem onClick={handleCloseUserMenu} sx={{ justifyContent: 'center' }}>
                        <Button
                            variant="text"
                            style={{ padding: '8px 15px' }}
                            onClick={handleLogOut}
                        >
                            {messages['nav.logout']}
                        </Button>
                    </MenuItem>
                    :
                    <>
                        <MenuItem onClick={handleCloseUserMenu} sx={{ justifyContent: 'center' }}>
                            <StyledLink
                                to='/login'
                                component={RouterLink}
                                style={{ padding: '8px 15px' }}
                                underline="none"
                            >
                                {messages['nav.login']}
                            </StyledLink>
                        </MenuItem>
                        <MenuItem onClick={handleCloseUserMenu} sx={{ justifyContent: 'center' }}>
                            <StyledLink
                                to='/sign-up'
                                component={RouterLink}
                                style={{ padding: '8px 15px' }}
                                underline="none"
                            >
                                {messages['nav.signup']}
                            </StyledLink>
                        </MenuItem>
                    </>
            }
        </>
    )
}

export default AuthButton