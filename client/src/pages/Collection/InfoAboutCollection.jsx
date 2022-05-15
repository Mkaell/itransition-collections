import { Avatar, Button, Typography, Box, TextField, IconButton, ButtonGroup, Paper } from '@mui/material'
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { IMAGE } from '../../utils/constants';

const InfoAboutCollection = ({ handleClickOpen, collection, setCollection }) => {

    const [name, setName] = useState('');
    const [open, setOpen] = useState(false)
    const [description, setDescription] = useState('');
    const { messages } = useIntl()
    const currentUser = useSelector(state => state.auth.authData?.result)

    const collectionHandler = (e) => {
        e.preventDefault()
        setCollection({
            ...collection,
            name,
            description,
        });
        setOpen(prevState => !prevState)
    }

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
                    src={collection.image ? collection.image : IMAGE.COLLECTION}
                    sx={{ width: 150, height: 150, mr: { xs: 0, sm: 2 } }}
                />
                <Box xs={4}>
                    {open &&
                        <form
                            style={{ display: 'flex', flexDirection: 'column' }}
                            onSubmit={(e) => collectionHandler(e)}
                        >
                            <TextField
                                name='name'
                                placeholder={messages['profile.name']}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextField
                                name='description'
                                placeholder={messages['profile.description']}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <ButtonGroup sx={{ display: 'flex' }}>
                                <Button
                                    sx={{ width: { xs: '100%' } }}
                                    variant="contained"
                                    startIcon={<CloseIcon />}
                                    onClick={() => setOpen(prevState => !prevState)}
                                >
                                    {messages['profile.close-button']}
                                </Button>
                                <Button
                                    sx={{ width: { xs: '100%' } }}
                                    variant="contained"
                                    startIcon={<SaveIcon />}
                                    type='submit'
                                >
                                    {messages['profile.save-button']}
                                </Button>
                            </ButtonGroup>

                        </form>
                    }
                    {
                        (currentUser?.role || (collection.userId === currentUser?._id)) ?
                            !open &&
                            <>
                                <IconButton
                                    aria-label="edit"
                                    onClick={() => setOpen(prevState => !prevState)}
                                    sx={{ justifyContent: 'flex-end', }}
                                >
                                    <EditIcon />
                                </IconButton>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                                    <Typography variant='h3'>
                                        {collection.name}
                                    </Typography>
                                    <Typography>
                                        {collection.description}
                                    </Typography>
                                </Box>
                            </> :
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                                <Typography variant='h3'>
                                    {collection.name}
                                </Typography>
                                <Typography>
                                    {collection.description}
                                </Typography>
                            </Box>
                    }
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                {
                    (currentUser?.role || (collection.userId === currentUser?._id)) ?
                        <Button
                            sx={{ minWidth: { xs: '100%', sm: '150px' } }}
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