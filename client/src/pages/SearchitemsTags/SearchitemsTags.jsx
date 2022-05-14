import { Box, CircularProgress, Paper, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import ListItems from '../../components/ListItems/ListItems'
const SearchitemsTags = () => {

    const items = useSelector(state => state?.search?.items);
    const isloading = useSelector(state => state?.search?.isloading);

    return (
        <>
            {
                isloading ? <CircularProgress /> :
                    <Box>
                        <Typography variant='h4' textAlign='center' mt={5}>Items</Typography>
                        <Paper variant="outlined" sx={{ mt: 5 }}>
                            <ListItems items={items} />
                        </Paper>
                    </Box>

            }
        </>
    )
}

export default SearchitemsTags