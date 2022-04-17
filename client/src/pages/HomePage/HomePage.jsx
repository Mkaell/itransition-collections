import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import React from 'react'


import './HomePage.css'
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

const HomePage = () => {
    return (
        <div>
            <div className='home-clouds-tags'>
                <BasicCard />
            </div>
            <div className='home-wrapper'>
                <div className='home-collections'>
                    <BasicCard />
                    <BasicCard />
                    <BasicCard />
                    <BasicCard />
                </div>
                <div className='home-items'>
                    <BasicCard />
                    <BasicCard />
                    <BasicCard />
                    <BasicCard />

                </div>
            </div>
        </div>

    )
}

export default HomePage