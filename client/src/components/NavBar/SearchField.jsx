import React from 'react'
import { useIntl } from 'react-intl';
import { styled, alpha } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Autocomplete, TextField } from '@mui/material';
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
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    // padding: theme.spacing(0, 2),
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

const SearchField = ({ foundItems, findItems }) => {

    const { messages } = useIntl();

    return (
        <Search>
            {/* <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper> */}
            <Autocomplete
                sx={{ minWidth: 250 }}
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
                        label={messages["nav.search"]}
                        onChange={(e) => findItems(e)}
                        InputProps={{
                            ...params.InputProps,

                        }}
                    />
                )}
            />

        </Search>
    )
}

export default SearchField