import { Card, CardActionArea, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IMAGE } from '../../utils/constants';

const CollectionCard = ({ image, name, id, deleteCollection, userId, location, public_id }) => {

    const currentUser = useSelector(state => state.auth.authData?.result);
    const navigate = useNavigate()

    return (
        <Card
            key={id}
            sx={{
                width: 200,
                mt: 2,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
            elevation={5}
        >

            <CardActionArea onClick={() => navigate(`/collection/${id}`)}>
                <CardMedia
                    component="img"
                    height="180"
                    image={image ? image : IMAGE.COLLECTION}
                    alt={name}
                />
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography color="text.secondary" variant='h5'>
                        {name}
                    </Typography>
                </CardContent>
            </CardActionArea >
            {
                !(location?.pathname === '/') &&
                (currentUser?.role || (userId === currentUser?._id)) &&
                <CardActions sx={{ justifyContent: 'flex-end', padding: 0 }}>
                    <IconButton aria-label="delete" onClick={() => deleteCollection(id, public_id)}>
                        <DeleteIcon />
                    </IconButton>
                </CardActions>
            }
        </Card >
    );

}

export default CollectionCard