import { Avatar, Button, Grid, Typography, Box, TextField } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

const InfoAboutCollection = ({ handleClickOpen, collection }) => {

    const { messages } = useIntl()
    const currentUser = useSelector(state => state.auth.authData?.result)

    return (
        <Box style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            marginTop: '30px'
        }}
        >
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: { xs: 'column', sm: 'row' },
                textAlign: 'center'
            }} >
                <Avatar
                    alt="Remy Sharp"
                    src={collection.image}
                    sx={{ width: 150, height: 150, mr: 2 }}
                />
                <Box xs={4}>
                    <Typography variant='h3'>
                        {collection.name}
                    </Typography>
                    <Typography>
                        {collection.description}
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                {
                    (currentUser?.role || (collection.userId === currentUser?._id)) ?
                        <Button
                            sx={{ width: { xs: '100%', sm: '150px' } }}
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => handleClickOpen()}
                        >
                            {messages['collection.add-item-button']}
                        </Button> :
                        <Box mt={10}></Box>
                }
            </Box>
        </Box>
    )
}

export default InfoAboutCollection