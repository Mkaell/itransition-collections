import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const CollectionCard = (props) => {
    const navigate = useNavigate()
    const { image, description, name, theme, id, deleteCollection } = props
    return (
        <Card sx={{ width: 200, mt: 2, borderRadius: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '280px' }}>

            <CardActionArea onClick={() => navigate(`/collection/${id}`)}>
                <CardMedia
                    component="img"
                    height="180"
                    image={image}
                    alt={name}
                />
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography color="text.secondary">
                        {name}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions >
                <IconButton aria-label="delete" onClick={() => deleteCollection(id)}>
                    <DeleteIcon />
                </IconButton>
            </CardActions>

        </Card >
    );

}

export default CollectionCard