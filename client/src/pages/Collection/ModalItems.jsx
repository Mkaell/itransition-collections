


import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { FormControl, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import BasicTextFields from './BasicTextFields';
import AdditionalFields from './AdditionalFields';
import { createItem } from '../../api';
import { useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';

function ModalItems({ open, handleClose, collection, items, setItems, clearFormItem, collectionId, setRows }) {

    let basiclFieldsKeys = Object.keys(collection.itemFields?.basic || {});
    let additionalFieldsKeys = Object.keys(collection.itemFields?.additional || {});
    const { messages } = useIntl();
    console.log(collection);
    const onChangeControl = (event) => {

        const fieldName = event.target.name;
        const fieldValue = event.target.value;

        setItems({
            ...items,
            ...items.field, [fieldName]: fieldValue,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await createItem({ ...items, collectionId, userId: collection.userId })
            setRows(response.data.items)
        } catch (error) {
            console.log(error);
        }
        clearFormItem()
        handleClose()
    }

    return (

        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth="sm"
            scroll='paper'
        >
            <Paper>
                <DialogTitle id="alert-dialog-title">
                    {messages['collection.modal-title']}
                </DialogTitle>
            </Paper>
            <DialogContent sx={{ px: 10 }}>
                <FormControl fullWidth>
                    <form
                        autoComplete="off"
                        id='form-collection'
                        onSubmit={handleSubmit}
                        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                    >
                        <BasicTextFields
                            basiclFieldsKeys={basiclFieldsKeys}
                            items={items}
                            setItems={setItems}
                            onChangeControl={onChangeControl}
                        />
                        <AdditionalFields
                            additionalFieldsKeys={additionalFieldsKeys}
                            collection={collection}
                            onChangeControl={onChangeControl}
                            items={items}
                            setItems={setItems}
                        />
                    </form>
                </FormControl>
            </DialogContent>
            <Paper >
                <DialogActions>
                    <Button onClick={handleClose} variant="contained">
                        {messages['profile.clear-button']}
                    </Button>
                    <Button autoFocus type='submit' form='form-collection' variant="contained">
                        {messages['profile.create-button']}
                    </Button>
                </DialogActions>
            </Paper>

        </Dialog >

    );
}
export default ModalItems

