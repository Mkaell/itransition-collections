import { Box, Chip, Typography } from '@mui/material'
import React from 'react'

const Item = ({ item }) => {
    return (
        <>
            <Typography>
                {item?.name}
            </Typography>
            <Box>
                {
                    item?.tags.map((tag) => (
                        <Chip
                            label={tag} />
                    ))
                }
            </Box>
            <Box>
                {
                    item?.dateCreate
                }
            </Box>
        </>
    )
}

export default Item