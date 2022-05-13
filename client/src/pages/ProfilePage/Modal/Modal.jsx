import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import InputChip from '../InputChip/InputChip';
import AdditionalFields from './AdditionalFields';
import Dropzone from './Dropzone';
import RequiredField from './RequiredField';
import { useDispatch, useSelector } from 'react-redux';
import { createCollectionDispatch } from '../../../store/actionCreators/collectionsCreator';

const Modal = ({ open, handleClose, iduser, messages }) => {

    const userId = useSelector(state => state.auth.authData?.result._id)
    const dispatch = useDispatch()

    const [collection, setCollection] = useState({
        collectionImage: '',
        collectionInfo: { name: "", description: "", theme: "" },
        itemFields: {
            numerical: [],
            string: [],
            text: [],
            date: [],
            boolean: [],
        },
        creatorId: '',
    });
    console.log(collection);
    const clearState = () => {
        setCollection({
            collectionImage: '',
            collectionInfo: { name: "", description: "", theme: "" },
            itemFields: {
                numerical: [],
                string: [],
                text: [],
                date: [],
                boolean: [],
            },
            creatorId: '',
        });
        handleClose();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(createCollectionDispatch({ ...collection, userId: iduser ? iduser : userId }));
        clearState();
    }

    return (
        <Dialog
            open={open}
            fullWidth
            maxWidth="md"
            onClose={handleClose}
            scroll="paper"
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {messages['profile.create-collection']}
            </DialogTitle>

            <DialogContent >
                <FormControl fullWidth>
                    <form
                        autoComplete="off"
                        id='form-collection'
                        onSubmit={handleSubmit}>
                        <Grid
                            container
                            spacing={3}
                            justifyContent='center'
                            flexDirection={{ xs: 'column', md: 'row' }}
                        >
                            <Grid item xs >
                                <Dropzone
                                    setCollection={setCollection}
                                    collection={collection} />
                            </Grid>
                            <Grid item xs>
                                <RequiredField
                                    collection={collection}
                                    setCollection={setCollection} />
                            </Grid>
                            <Grid item xs>
                                <AdditionalFields
                                    collection={collection}
                                    setCollection={setCollection} />
                            </Grid>
                        </Grid>
                    </form>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={clearState}
                    variant="contained">
                    {messages['profile.clear-button']}
                </Button>
                <Button
                    autoFocus
                    type='submit'
                    variant="contained"
                    form='form-collection'
                    disabled={!collection.collectionImage ? true : false}>
                    {messages['profile.create-button']}
                </Button>
            </DialogActions>
        </Dialog >
    )
}

export default Modal