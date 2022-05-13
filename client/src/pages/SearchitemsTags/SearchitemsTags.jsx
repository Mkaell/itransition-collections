import { CircularProgress, Paper, Typography } from '@mui/material'
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
                    <>
                        <Typography variant='h4' textAlign='center' mt={5}>Items</Typography>
                        <Paper>
                            <ListItems items={items} />
                        </Paper>
                    </>

            }
        </>
    )
}

export default SearchitemsTags