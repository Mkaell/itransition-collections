import React, { useEffect, useState } from 'react'
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Autocomplete, Button, Chip, TextField } from '@mui/material';
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

const PagesButton = () => {
    const { messages } = useIntl();
    const user = useSelector(state => state.auth.authData?.result)
    return (
        <>
            {
                user?.role ?
                    <>
                        <Button variant="text" color="secondary" style={{ padding: '0' }}>
                            <Link to='/' style={{ color: 'white', padding: '8px 15px' }}>
                                {messages['nav.home']}
                            </Link>
                        </Button>
                        <Button variant="text" color="secondary" style={{ padding: '0' }}>
                            <Link to='/admin' style={{ color: 'white', padding: '8px 15px' }}>
                                {messages['nav.admin']}
                            </Link>
                        </Button>
                        <Button variant="text" color="secondary" style={{ padding: '0' }}>
                            <Link to='/profile' style={{ color: 'white', padding: '8px 15px' }}>
                                {messages['nav.profile']}
                            </Link>
                        </Button>
                    </> :
                    user ?

                        <>
                            <Button variant="text" color="secondary" style={{ padding: '0' }}>
                                <Link to='/' style={{ color: 'white', padding: '8px 15px' }}>
                                    {messages['nav.home']}
                                </Link>
                            </Button>
                            <Button variant="text" color="secondary" style={{ padding: '0' }}>
                                <Link to='/profile' style={{ color: 'white', padding: '8px 15px' }}>
                                    {messages['nav.profile']}
                                </Link>
                            </Button>
                        </> :
                        <Button variant="text" color="secondary" style={{ padding: '0' }}>
                            <Link to='/' style={{ color: 'white', padding: '8px 15px' }}>
                                {messages['nav.home']}
                            </Link>
                        </Button>
            }
        </>
    )
}

export default PagesButton