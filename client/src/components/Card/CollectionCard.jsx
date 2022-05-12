import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CollectionCard = ({ image, name, id, deleteCollection, userId, location }) => {

    const currentUser = useSelector(state => state.auth.authData?.result);
    const navigate = useNavigate()

    return (
        <Card sx={{ width: 200, mt: 2, borderRadius: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', }} elevation={5}>

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
            </CardActionArea >
            {
                !(location?.pathname === '/') &&
                (currentUser?.role || (userId === currentUser?._id)) &&
                <CardActions sx={{ justifyContent: 'flex-end', padding: 0 }}>
                    <IconButton aria-label="delete" onClick={() => deleteCollection(id)}>
                        <DeleteIcon />
                    </IconButton>
                </CardActions>
            }
        </Card >
    );

}

export default CollectionCard