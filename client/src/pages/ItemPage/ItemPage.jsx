import { Divider, Grid, List, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getItem } from '../../api'
import Comments from './Comments'
import InputComments from './InputComments'
import Item from './Item'

const ItemPage = () => {
    const [item, setItem] = useState()
    const { idItem } = useParams();
    console.log(item);

    useEffect(() => {
        try {
            (async () => {
                const response = await getItem(idItem);
                setItem(response.data)
            })()
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <Paper>
            <Grid container mt={5}>
                <Grid item xs={6}>
                    <Item item={item} />
                </Grid>
                <Grid item xs={6}>
                    <Grid container fullWidth rowSpacing={1}>
                        <Grid item xs={12}>
                            <Typography variant='h5' padding={1}>
                                Comments
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Comments />
                        </Grid>
                        <Grid item xs={12} >
                            <InputComments />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>

    )
}

export default ItemPage