import React, { useCallback, useEffect, useState } from 'react'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import './ProfilePage.css'
import Card from '../../components/Card/CollectionCard';
import Modal from '../../components/Modal/Modal';
import CollectionCard from '../../components/Card/CollectionCard';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCollectionDispatch, getcollectionsDispatch } from '../../store/actionCreators/collectionsCreator';
import CircularProgress from '@mui/material/CircularProgress';


const ProfilePage = () => {

    const dispatch = useDispatch()
    const { collections, isLoading } = useSelector(state => state.collections)
    console.log(collections);
    const userId = useSelector(state => state.auth.authData.result._id)
    const [open, setOpen] = useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        dispatch(getcollectionsDispatch({ userId }))
    }, [])

    const handleDeleteCollection = (id) => {
        dispatch(deleteCollectionDispatch(id))
    }

    return (
        <div className='profile'>
            <div className='profile-button'>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleClickOpen()}
                >New Collection
                </Button>
            </div>
            <div className='profile-collections_wrapper'>
                {
                    isLoading ? <CircularProgress sx={{ mt: 10 }} /> :
                        collections &&
                        collections?.map((collection) =>
                            <CollectionCard
                                name={collection.name}
                                description={collection.description}
                                theme={collection.theme}
                                image={collection.image}
                                id={collection._id}
                                key={collection._id}
                                deleteCollection={handleDeleteCollection}
                            />
                        )
                }
            </div>
            <Modal handleClose={handleClose} open={open} />
        </div>
    )
}

export default ProfilePage