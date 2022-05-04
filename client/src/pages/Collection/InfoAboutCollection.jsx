import { Avatar, Button, Grid, Typography, Box } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';

const InfoAboutCollection = ({ handleClickOpen, collection }) => {
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
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleClickOpen()}
                >
                    Add Item
                </Button>
            </Box>
        </div>
    )
}

export default InfoAboutCollection