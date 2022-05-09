import React from 'react'
import List from '@mui/material/List';
import Comment from './Comment';

const Comments = ({ comments }) => {
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper', overflow: 'auto', height: '50vh', }}>
            {
                comments.map((comment, index) => (
                    <Comment comment={comment} key={comment.id} />
                )
                )
            }
        </List>
    )
}

export default Comments