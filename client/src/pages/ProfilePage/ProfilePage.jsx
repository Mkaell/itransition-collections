import React from 'react'
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import './ProfilePage.css'

function BasicCard() {
    return (
        <Card sx={{ minWidth: 200, mt: 2 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Word of the Day
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    adjective
                </Typography>
                <Typography variant="body2">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}

const ProfilePage = () => {
    return (
        <div className='profile'>
            <div className='profile-button'>
                <Button variant="contained" startIcon={<AddIcon />}>New Collection</Button>
            </div>
            <div className='profile-collections_wrapper'>
                <BasicCard />
                <BasicCard />
                <BasicCard />
                <BasicCard />
            </div>

        </div>
    )
}

export default ProfilePage