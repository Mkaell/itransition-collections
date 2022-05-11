import { Badge, Box, Chip, CircularProgress, Divider, Typography } from '@mui/material'
import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
const Item = ({ item }) => {

    const date = useSelector(state => state?.items?.items?.dateCreate)

    // const dateCreate = format(new Date(date), "HH:mm:ss'/'yyyy-MM-dd")
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '50%' }}>
            <Typography variant='h5'>
                {item?.name}
            </Typography>
            <Box>
                <Badge badgeContent={item?.usersByLikes.length} color="primary" >
                    <FavoriteIcon color="action" />
                </Badge>
                <Divider />
            </Box>

            <Box>
                {
                    item?.tags.map((tag) => (
                        <Chip
                            label={tag} />
                    ))
                }
                <Divider />
            </Box>
            <Box>
                {date}
            </Box>
        </Box>
    )
}

export default Item