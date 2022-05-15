import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'
import { useIntl } from 'react-intl'
import { useSelector } from 'react-redux'
import ListItems from '../../components/ListItems/ListItems'
const SearchitemsTags = () => {

    const items = useSelector(state => state?.search?.items);
    const isloading = useSelector(state => state?.search?.isloading);
    const { messages } = useIntl()

    return (
        <>
            {
                isloading ? <CircularProgress /> :
                    <Box>
                        <Typography
                            variant='h4'
                            textAlign='center'
                            mt={5}>
                            {messages['search.items-title']}
                        </Typography>
                        <Box sx={{ mt: 5 }}>
                            <ListItems items={items} />
                        </Box>
                    </Box>

            }
        </>
    )
}

export default SearchitemsTags