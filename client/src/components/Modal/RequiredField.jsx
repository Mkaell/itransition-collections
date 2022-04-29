import { MenuItem, TextField, Typography } from '@mui/material'
import React from 'react'

const RequiredField = ({ collection, setCollection }) => {


    const onChangeControl = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;

        setCollection({
            ...collection,
            collectionInfo: { ...collection.collectionInfo, [fieldName]: fieldValue },
        });
    };

    return (
        <>
            <Typography>Required field</Typography>
            <TextField
                onChange={(e) => onChangeControl(e)}
                required
                id='name'
                name="name" variant="outlined" label="Name" fullWidth sx={{ mt: 2 }}
            />
            <TextField
                onChange={(e) => onChangeControl(e)}
                name="description"
                id='description'
                required
                variant="outlined" label="Description" fullWidth multiline sx={{ mt: 2 }}
            />
            <TextField
                defaultValue=""
                onChange={(e) => onChangeControl(e)}
                required
                name="theme"
                label="Theme"
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
                select
            >
                <MenuItem value="alcohol">Alcohol</MenuItem>
                <MenuItem value="books">Books</MenuItem>
                <MenuItem value="space">Space</MenuItem>
                <MenuItem value="it">IT</MenuItem>
                <MenuItem value="war">War</MenuItem>
            </TextField>
        </>
    )
}

export default RequiredField