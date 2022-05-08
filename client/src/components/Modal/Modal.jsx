import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import InputChip from '../InputChip/InputChip';
import AdditionalFields from './AdditionalFields';
import Dropzone from './Dropzone';
import RequiredField from './RequiredField';
import { createCollection } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { createCollectionDispatch } from '../../store/actionCreators/collectionsCreator';

const Modal = ({ open, handleClose, iduser }) => {

    const userId = useSelector(state => state.auth.authData.result._id)
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
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(createCollectionDispatch({ ...collection, userId: iduser ? iduser : userId }));
        clearState();
        handleClose();
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
                {"Create Collection"}
            </DialogTitle>
            <Paper>
                <DialogContent>
                    <FormControl>
                        <form autoComplete="off" id='form-collection' onSubmit={handleSubmit}>
                            <Grid container spacing={6}>
                                <Grid item xs >
                                    <Typography>Image</Typography>
                                    <Dropzone setCollection={setCollection} collection={collection} />
                                </Grid>
                                <Grid item xs>
                                    <RequiredField collection={collection} setCollection={setCollection} />
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography>No Required</Typography>
                                    <AdditionalFields collection={collection} setCollection={setCollection} />
                                </Grid>
                            </Grid>
                        </form>
                    </FormControl>
                </DialogContent>
            </Paper>
            <DialogActions>
                <Button onClick={handleClose} >Disagree</Button>
                <Button autoFocus type='submit' form='form-collection' disabled={!collection.collectionImage ? true : false}>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default Modal