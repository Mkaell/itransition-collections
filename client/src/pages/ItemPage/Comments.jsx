import React from 'react'
import List from '@mui/material/List';
import Comment from './Comment';

const Comments = () => {
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper', overflow: 'auto', height: '50vh', }}>
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
        </List>
    )
}

export default Comments