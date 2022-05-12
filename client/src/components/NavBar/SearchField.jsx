import React from 'react'
import { useIntl } from 'react-intl';
import { styled, alpha } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Autocomplete, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
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
        width: '100%',
    },
}));



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
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props} key={option._id}>
                        {option.name} ({option._id})
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