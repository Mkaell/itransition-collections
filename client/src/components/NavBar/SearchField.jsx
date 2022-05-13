import React from 'react'
import { useIntl } from 'react-intl';
import { styled, alpha } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Autocomplete, Avatar, InputAdornment, Link, List, ListItemAvatar, ListItemButton, ListItemText, Paper, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link as RouterLink } from 'react-router-dom';
import { Search } from './style';

const SearchField = ({ foundItems, findItems }) => {

    const { messages } = useIntl();

    return (
        <Search>
            <Autocomplete
                sx={{ minwidth: { xs: '250px', md: '100%' } }}
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
                    <Box
                        component='li'
                        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                        {...props}
                        key={option._id}
                    >
                        {

                            <Link
                                component={RouterLink}
                                to={
                                    option.description ?
                                        `/collection/${option._id}` :
                                        `/collection/${option.collectionId}/item/${option._id}`
                                }
                                style={{ padding: '8px 15px' }}
                                underline="none"
                                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Avatar alt="Remy Sharp" sx={{ width: 30, height: 30 }} />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {option?.name}
                                    </Typography>
                                </Box>


                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {option?._id}
                                </Typography>
                            </Link>
                        }
                    </Box>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label={messages["nav.search"]}
                        onChange={(e) => findItems(e)}

                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}

                    />

                )}
            />

        </Search>
    )
}

export default SearchField