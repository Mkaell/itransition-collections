import { Avatar, Box, Divider, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material'
import React from 'react'

const Comment = ({ comment }) => {
    return (
        <>
            <ListItemButton autoFocus={true} alignItems="flex-start" >
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" />
                </ListItemAvatar>
                <ListItemText
                    // primary={comment.name}
                    primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {comment.name}
                            </Typography>
                            {comment.date}
                        </Box>

                    }
                    secondary={
                        <>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {comment.content}
                            </Typography>
                        </>
                    }
                />
            </ListItemButton>
            <Divider variant="inset" component="li" />
        </>
    )
}

export default Comment