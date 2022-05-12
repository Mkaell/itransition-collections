import { Button, FormControl, Grid, TextField } from '@mui/material'
import React from 'react'
import SendIcon from '@mui/icons-material/Send';
import { useIntl } from 'react-intl';


const InputComments = ({ addComment, id, comment, comments, handleOnChange }) => {
    const { messages } = useIntl();

    return (

        <Grid container>
            <form onSubmit={(e) => addComment(e)} style={{ display: 'flex', width: '100%' }}>
                <Grid item xs>
                    <TextField fullWidth value={comment} onChange={(e) => handleOnChange(e)} placeholder={messages["item.placeholder"]} />
                </Grid>
                <Grid item sx={{ height: '56px' }} xs={3} >
                    <Button variant="contained" sx={{ height: '100%', width: '100%' }} type='submit' endIcon={<SendIcon />} >
                        {messages["item.send-button"]}
                    </Button>
                </Grid>
            </form>

        </Grid>

    )
}

export default InputComments