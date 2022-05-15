import React from 'react'
import List from '@mui/material/List';
import Comment from './Comment';
import { ListItem, ListItemText } from '@mui/material';
import { useIntl } from 'react-intl';

const Comments = ({ comments }) => {

    const { messages } = useIntl()
    return (
        <List sx={{
            width: '100%',
            bgcolor: 'background.paper',
            overflow: 'auto',
            height: '50vh',
        }}>
            {
                comments.length > 0 ?
                    comments.map((comment, index) => (
                        <Comment comment={comment} key={comment.id} />
                    )) :
                    <ListItem sx={{ marginTop: '140px', textAlign: 'center' }}>
                        <ListItemText >
                            {messages['item.no-comments']}
                        </ListItemText>
                    </ListItem>
            }
        </List>
    )
}

export default Comments