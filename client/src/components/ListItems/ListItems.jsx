import React from 'react'
import { Badge, Chip, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material'

import { NavLink } from 'react-router-dom'
import InboxIcon from '@mui/icons-material/Inbox';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';

const ListItems = ({ items }) => {

    return (
        <List sx={{ mt: 5 }}>
            {
                items?.map((item) =>
                    <>
                        <NavLink to={`/collection/${item.collectionId}/item/${item._id}`}>
                            <ListItem disablePadding classes='home-item' divider>
                                <ListItemButton classes='home-item'>
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={item.name} sx={{ color: 'secondary.main' }} />
                                    <ListItemText>
                                        {
                                            item?.tags.map((tag) => (
                                                <Chip
                                                    sx={{ mr: 1 }}
                                                    label={tag} />
                                            ))
                                        }
                                    </ListItemText>

                                    <Badge badgeContent={item.usersByLikes.length} color="primary" sx={{ mr: 1 }}>
                                        <FavoriteIcon color="action" />
                                    </Badge>
                                    <Badge badgeContent={item.comments.length} color="primary">
                                        <CommentIcon color="action" />
                                    </Badge>
                                </ListItemButton>
                            </ListItem>
                        </NavLink>
                    </>
                )
            }
        </List>
    )
}

export default ListItems