import { Badge, Chip, CircularProgress, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Paper, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import InboxIcon from '@mui/icons-material/Inbox';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import ListItems from '../../components/ListItems/ListItems'
const SearchitemsTags = () => {
    const { items, isloading } = useSelector(state => state?.items)
    return (
        <>
            {
                isloading ? <CircularProgress /> :
                    <>
                        <Typography variant='h4' textAlign='center' mt={5}>Items</Typography>
                        <Paper>
                            <ListItems items={items} />
                        </Paper>
                    </>

            }
        </>
    )
}

export default SearchitemsTags