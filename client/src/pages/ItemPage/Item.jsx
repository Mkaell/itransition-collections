import { Badge, Box, Chip, Divider, Typography } from '@mui/material'
import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector } from 'react-redux';

const Item = ({ item }) => {

    const date = useSelector(state => state?.items?.items?.dateCreate)

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '50%'
        }}
            key={item?._id}
        >
            <Typography variant='h5' mt={1}>
                {item?.name}
            </Typography>
            <Box mt={1}>
                <Badge badgeContent={item?.usersByLikes.length} color="primary" >
                    <FavoriteIcon color="action" />
                </Badge>
                <Divider />
            </Box>

            <Box mt={1}>
                {
                    item?.tags.map((tag) => (
                        <Chip
                            label={tag} />
                    ))
                }
                <Divider />
            </Box>
            <Box mt={1}>
                {date}
            </Box>
        </Box>
    )
}

export default Item