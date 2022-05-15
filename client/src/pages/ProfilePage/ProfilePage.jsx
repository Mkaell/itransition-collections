import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, Grid, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
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
    }, [dispatch, iduser, userId])

    const handleDeleteCollection = (id, public_id) => {
        if (iduser) {
            dispatch(deleteCollectionDispatch(id, { userId: iduser, public_id }))
        } else {
            dispatch(deleteCollectionDispatch(id, { userId, public_id }))
        }
    }

    return (
        <Box sx={{
            marginYop: '50px',
            width: '100%',
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Avatar
                    sx={{ width: 150, height: 150 }}
                    src='https://res.cloudinary.com/de3v3rkv6/image/upload/v1652511819/collection-app/myxrejtexam3hhdbxotw.png' />
                <Typography >
                    {useremail ? useremail : email}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} mt={4}>
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
                mt={{ xs: 0, sm: 4 }}
                paddingBottom={1}
                container
                item
                spacing={3}
                justifyContent="center"
                alignItems="center">
                {
                    isLoading ? <CircularProgress sx={{ mt: 10 }} /> :
                        collections &&
                        collections?.map((collection) =>
                            <Grid item key={collection._id}>
                                <CollectionCard
                                    name={collection.name}
                                    description={collection.description}
                                    theme={collection.theme}
                                    image={collection.image}
                                    id={collection._id}
                                    public_id={collection.public_id}
                                    deleteCollection={handleDeleteCollection}
                                    userId={collection.userId}
                                />
                            </Grid>
                        )
                }
            </Grid>
            <Modal handleClose={handleClose} open={open} iduser={iduser} messages={messages} />
        </Box>
    )
}

export default ProfilePage