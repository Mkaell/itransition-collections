import { Button, Card, CardActions, CardContent, CardMedia, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CollectionCard from '../../components/Card/CollectionCard';
import InboxIcon from '@mui/icons-material/Inbox';

import './HomePage.css'

import { DataGrid } from '@mui/x-data-grid';
import {
    randomCreatedDate,
    randomTraderName,
    randomUpdatedDate,
} from '@mui/x-data-grid-generator';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { fetchLargestCollectionsAndLastItems } from '../../api';

import { TagCloud } from 'react-tagcloud'
import { Link, useLocation } from 'react-router-dom';

const options = {
    luminosity: 'light',
    hue: 'purple',
}
const SimpleCloud = ({ data }) => (
    <TagCloud
        minSize={20}
        maxSize={35}
        style={{ width: '300px', textAlign: 'center' }}
        colorOptions={options}
        className='simple-cloud'
        tags={data}
        onClick={tag => alert(`'${tag.value}' was selected!`)}
    />
)

const HomePage = () => {

    const [largestCollections, setLargestCollections] = useState([]);
    const [lastAddedItems, setLastAddedItems] = useState([]);
    const location = useLocation()

    useEffect(() => {
        try {
            (async () => {
                const { data } = await fetchLargestCollectionsAndLastItems()
                setLargestCollections(data.bigCollections)
                setLastAddedItems(data.lastAddedItems)
            })()
        } catch (error) {
            console.log(error);
        }
    }, [])

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    let tagsCloud = []
    let tagsCloudi = []
    let arr = lastAddedItems.map((item) => tagsCloud.concat(item.tags)).flat()
    arr.map((tag) =>
        tagsCloudi.push({
            'value': `#${tag}`,
            'count': getRandomArbitrary(15, 35)
        })
    )
    console.log(tagsCloudi);
    return (
        <div>
            <div className='home-clouds-tags'>
                {
                    largestCollections.map((collection) =>
                        <CollectionCard
                            key={collection._id}
                            location={location}
                            image={collection.image}
                            name={collection.name}
                            id={collection._id}
                            userId={collection.userId} />
                    )
                }
            </div>
            <Divider sx={{ mt: 4 }} />
            <div className='home-wrapper'>
                <div className='home-collections'>
                    <SimpleCloud data={tagsCloudi} />
                </div>
                <Divider orientation="vertical" flexItem />
                <div className='home-items'>
                    <List subheader={<ListSubheader>Items</ListSubheader>}>
                        {
                            lastAddedItems.map((item) =>
                                <>
                                    <Link to={`/collection/${item.collectionId}/item/${item._id}`}>
                                        <ListItem disablePadding >
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <InboxIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={item.name} />
                                            </ListItemButton>
                                        </ListItem>
                                    </Link>
                                    <Divider />
                                </>
                            )
                        }
                    </List>
                </div>
            </div>
        </div>

    )
}

export default HomePage