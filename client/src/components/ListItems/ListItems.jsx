import React from 'react'
import { Badge, Chip, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, CircularProgress } from '@mui/material'
import { Link } from 'react-router-dom'
import InboxIcon from '@mui/icons-material/Inbox';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';


const ListItems = ({ items }) => {

    return (
        <>
            <List >
                {
                    items?.map((item) =>

                        <Link to={`/collection/${item?.collectionId}/item/${item?._id}`}>
                            <ListItem disablePadding divider key={item._id}>
                                <ListItemButton >
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText sx={{ color: 'secondary.main' }} >
                                        {item?.name}
                                    </ListItemText>
                                    <ListItemText sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        minWidth: '100px'
                                    }}
                                        primary={
                                            item?.tags.map((tag) => (
                                                <Chip
                                                    sx={{ mr: 1 }}
                                                    label={tag} />
                                            ))

                                        }
                                    />


                                    <Badge badgeContent={item?.usersByLikes.length} color="primary" sx={{ mr: 1 }}>
                                        <FavoriteIcon color="action" />
                                    </Badge>
                                    <Badge badgeContent={item?.comments.length} color="primary">
                                        <CommentIcon color="action" />
                                    </Badge>
                                </ListItemButton>
                            </ListItem>
                        </Link>

                    )}
            </List>

        </>
    )
}

export default ListItems