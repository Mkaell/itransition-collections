import { Avatar, Button, Grid, Typography, Box } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

const InfoAboutCollection = ({ handleClickOpen, collection }) => {
    const { messages } = useIntl()
    const currentUser = useSelector(state => state.auth.authData?.result)

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', marginTop: '30px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {
                    (currentUser?.role || (collection.userId === currentUser?._id)) ?
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => handleClickOpen()}
                        >
                            {messages['collection.add-item-button']}
                        </Button> :
                        <Box mt={10}></Box>
                }
            </Box>
        </div>
    )
}

export default InfoAboutCollection