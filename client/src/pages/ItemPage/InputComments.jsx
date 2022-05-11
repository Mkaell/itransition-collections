import { Button, FormControl, Grid, TextField } from '@mui/material'
import React from 'react'
import SendIcon from '@mui/icons-material/Send';


const InputComments = ({ addComment, id, comment, comments, handleOnChange }) => {
    return (

        <Grid container>
            <form onSubmit={(e) => addComment(e)} style={{ display: 'flex', width: '100%' }}>
                <Grid item xs={10}>
                    <TextField fullWidth value={comment} onChange={(e) => handleOnChange(e)} placeholder='Comment' />
                </Grid>
                <Grid item sx={{ height: '56px' }} xs={2}>
                    <Button variant="contained" sx={{ height: '100%' }} type='submit' endIcon={<SendIcon />} >
                        Send
                    </Button>
                </Grid>
            </form>

        </Grid>

    )
}

export default InputComments