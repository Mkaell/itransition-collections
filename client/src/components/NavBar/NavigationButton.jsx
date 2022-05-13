import React, { useEffect, useState } from 'react'

import { Autocomplete, Button, Chip, Link, MenuItem, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { StyledLink } from './style';

const NavigationButton = ({ handleCloseNavMenu }) => {

    const { messages } = useIntl();
    const user = useSelector(state => state.auth.authData?.result);

    return (
        <>
            {
                user?.role ?
                    <>
                        <MenuItem onClick={handleCloseNavMenu} sx={{ justifyContent: 'center' }}>
                            <StyledLink
                                component={RouterLink}
                                to='/'
                                style={{ padding: '8px 15px' }}
                                underline="none"
                            >
                                {messages['nav.home']}
                            </StyledLink>
                        </MenuItem>
                        <MenuItem onClick={handleCloseNavMenu} sx={{ justifyContent: 'center' }}>
                            <StyledLink
                                component={RouterLink}
                                to='/admin'
                                style={{ padding: '8px 15px' }}
                                underline="none"
                            >
                                {messages['nav.admin']}
                            </StyledLink>
                        </MenuItem>
                        <MenuItem onClick={handleCloseNavMenu} sx={{ justifyContent: 'center' }}>
                            <StyledLink
                                component={RouterLink}
                                to='/profile'
                                style={{ padding: '8px 15px' }}
                                underline="none"
                            >
                                {messages['nav.profile']}
                            </StyledLink>
                        </MenuItem>
                    </> :
                    user ?

                        <>
                            <MenuItem onClick={handleCloseNavMenu} sx={{ justifyContent: 'center' }}>
                                <StyledLink
                                    component={RouterLink}
                                    to='/'
                                    style={{ padding: '8px 15px' }}
                                    underline="none"
                                >
                                    {messages['nav.home']}
                                </StyledLink>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu} sx={{ justifyContent: 'center' }}>
                                <StyledLink
                                    component={RouterLink}
                                    to='/profile'
                                    style={{ padding: '8px 15px' }}
                                    underline="none"
                                >
                                    {messages['nav.profile']}
                                </StyledLink>
                            </MenuItem>
                        </> :
                        <MenuItem onClick={handleCloseNavMenu} sx={{ justifyContent: 'center' }}>
                            <StyledLink
                                component={RouterLink}
                                to='/'
                                sx={{ padding: '8px 15px' }}
                                underline="none"
                            >
                                {messages['nav.home']}
                            </StyledLink>
                        </MenuItem>
            }
        </>
    )
}

export default NavigationButton