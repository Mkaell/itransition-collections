import { Avatar, Divider, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material'
import React from 'react'

const Comment = ({ comment }) => {
    return (
        <>
            <ListItemButton autoFocus={true} alignItems="flex-start" >
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" />
                </ListItemAvatar>
                <ListItemText
                    primary={comment.name}
                    secondary={
                        <>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {comment.date}
                            </Typography>
                            {comment.content}
                        </>
                    }
                />
            </ListItemButton>
            <Divider variant="inset" component="li" />
        </>
    )
}

export default Comment