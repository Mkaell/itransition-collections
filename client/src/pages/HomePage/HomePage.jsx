
import React, { useEffect, useState } from 'react'
import CollectionCard from '../../components/Card/CollectionCard';


import './HomePage.css'

import { fetchCollectionsAndLastItems } from '../../api';


import { useLocation } from 'react-router-dom';

import ListItems from '../../components/ListItems/ListItems';
import SimpleCloud from './SimpleCloud';
import { getHomePageInfo } from '../../store/actionCreators/collectionsCreator';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Grid } from '@mui/material';
import { Box } from '@mui/system';

const HomePage = () => {

    const [largestCollections, setLargestCollections] = useState([]);
    const [lastAddedItems, setLastAddedItems] = useState([]);
    const { isLoading } = useSelector(state => state?.items)
    const location = useLocation()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getHomePageInfo()).then(
            data => {
                setLargestCollections(data.bigCollections)
                setLastAddedItems(data.lastAddedItems)
            })
    }, [])

    return (
        <>
            {
                isLoading ?
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 30 }}>
                        <CircularProgress size={60} />
                    </Box>
                    :
                    <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid
                            mt={6}
                            container
                            item
                            spacing={3}
                            justifyContent="center"
                            alignItems="center">
                            {
                                largestCollections?.map((collection) =>
                                    <Grid item>
                                        <CollectionCard
                                            key={collection._id}
                                            location={location}
                                            image={collection.image}
                                            name={collection.name}
                                            id={collection._id}
                                            userId={collection.userId} />
                                    </Grid>

                                )
                            }
                        </Grid>
                        <Grid
                            container
                            flexDirection={{ xs: 'column', md: 'row' }}
                            justifyContent="center"
                            alignItems="center"
                            mt={3}
                        >
                            <Grid item xs>
                                <SimpleCloud lastAddedItems={lastAddedItems} />
                            </Grid>
                            <Grid item sx={{ width: '100%' }} xs>
                                <ListItems items={lastAddedItems} />
                            </Grid>
                        </Grid>
                    </Grid>

            }
        </>

    )
}

export default HomePage