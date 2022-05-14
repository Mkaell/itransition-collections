import { Box, Button, Grid, TextField } from '@mui/material'
import React from 'react'
import SendIcon from '@mui/icons-material/Send';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';


const InputComments = ({ addComment, comment, handleOnChange }) => {

    const { messages } = useIntl();
    const user = useSelector(state => state.auth?.authData);

    return (

        <Grid container>
            <form
                onSubmit={(e) => addComment(e)}
                style={{ display: 'flex', width: '100%' }}>
                <Grid item xs>
                    <TextField
                        fullWidth
                        value={comment}
                        onChange={(e) => handleOnChange(e)}
                        placeholder={messages["item.placeholder"]} />
                </Grid>
                <Box item sx={{ height: '56px' }} xs={3}>
                    <Button
                        disabled={!user ? true : false}
                        variant="contained"
                        sx={{ height: '100%', width: '100%' }}
                        type='submit'
                        endIcon={<SendIcon />} >
                        {messages["item.send-button"]}
                    </Button>
                </Box>
            </form>

        </Grid>

    )
}

export default InputComments