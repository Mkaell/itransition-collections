import { Button, FormControl, Grid, TextField } from '@mui/material'
import React from 'react'
import SendIcon from '@mui/icons-material/Send';
import { Box } from '@mui/system';
const InputComments = () => {
    return (

        <Grid container>
            <Grid item xs={10}>
                <TextField fullWidth />
            </Grid>
            <Grid item sx={{ height: '56px' }} xs={2}>
                <Button variant="contained" sx={{ height: '100%' }} endIcon={<SendIcon />}>
                    Send
                </Button>
            </Grid>
        </Grid>

    )
}

export default InputComments