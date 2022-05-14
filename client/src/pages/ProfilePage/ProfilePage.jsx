import React, { useCallback, useEffect, useState } from 'react'
import { Avatar, Box, Button, Grid, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import './ProfilePage.css'
import Modal from './Modal/Modal';
import CollectionCard from '../../components/Card/CollectionCard';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCollectionDispatch, getcollectionsDispatch } from '../../store/actionCreators/collectionsCreator';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';


const ProfilePage = () => {

    const { collections, isLoading } = useSelector(state => state?.collections);
    const userId = useSelector(state => state.auth?.authData?.result._id);
    const email = useSelector(state => state.auth?.authData?.result.email);
    const { iduser, useremail } = useParams()
    const dispatch = useDispatch()
    const { messages } = useIntl()
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (iduser) {
            dispatch(getcollectionsDispatch({ userId: iduser }))
        } else {
            dispatch(getcollectionsDispatch({ userId }))
        }
    }, [])

    const handleDeleteCollection = (id) => {
        if (iduser) {
            dispatch(deleteCollectionDispatch(id, { userId: iduser }))
        } else {
            dispatch(deleteCollectionDispatch(id, { userId }))
        }
    }

    return (
        <div className='profile'>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar
                    sx={{ width: 150, height: 150 }}
                    src='https://res.cloudinary.com/de3v3rkv6/image/upload/v1652511819/collection-app/myxrejtexam3hhdbxotw.png' />
                <Typography >
                    {useremail ? useremail : email}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    sx={{ minWidth: { xs: '100%', sm: '200px' } }}

                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleClickOpen()}
                >
                    {messages['profile.new-collection']}
                </Button>
            </Box>
            <Grid
                mt={6}
                container
                item
                spacing={3}
                justifyContent="center"
                alignItems="center">
                {
                    isLoading ? <CircularProgress sx={{ mt: 10 }} /> :
                        collections &&
                        collections?.map((collection) =>
                            <Grid item>
                                <CollectionCard
                                    name={collection.name}
                                    description={collection.description}
                                    theme={collection.theme}
                                    image={collection.image}
                                    id={collection._id}
                                    key={collection._id}
                                    deleteCollection={handleDeleteCollection}
                                    userId={collection.userId}
                                />
                            </Grid>

                        )
                }
            </Grid>
            <Modal handleClose={handleClose} open={open} iduser={iduser} messages={messages} />
        </div>
    )
}

export default ProfilePage