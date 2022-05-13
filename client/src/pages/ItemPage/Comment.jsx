import { Avatar, Box, Divider, ListItemAvatar, ListItemButton, ListItemText, Paper, Typography } from '@mui/material'
import React from 'react'

const Comment = ({ comment }) => {
    return (
        <Paper sx={{ alignItems: 'center' }}>
            <ListItemButton autoFocus={true} alignItems="flex-start" >
                <ListItemAvatar >
                    <Avatar alt="Remy Sharp" sx={{ width: 30, height: 30 }} />
                </ListItemAvatar>
                <ListItemText
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
                            <Typography fontSize={{ xs: '13px', sm: '16px' }}>
                                {comment.date}
                            </Typography>

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
        </Paper>
    )
}

export default Comment