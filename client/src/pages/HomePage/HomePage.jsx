import { Button, Card, CardActions, CardContent, CardMedia, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CollectionCard from '../../components/Card/CollectionCard';
import InboxIcon from '@mui/icons-material/Inbox';

import './HomePage.css'

import { fetchLargestCollectionsAndLastItems, searchItemTags } from '../../api';

import { TagCloud } from 'react-tagcloud'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';

const options = {
    luminosity: 'light',
    hue: 'purple',
}
const SimpleCloud = ({ data }) => {
    const navigate = useNavigate()
    const findItems = async (tag) => {
        try {
            const response = await searchItemTags({ searchedData: tag })
            navigate('/items')
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <TagCloud
            minSize={20}
            maxSize={35}
            style={{ width: '300px', textAlign: 'center' }}
            colorOptions={options}
            className='simple-cloud'
            tags={data}
            onClick={tag => findItems(tag.value)}
        />
    )

}

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
    Array.from(new Set(arr)).map((tag) =>
        tagsCloudi.push({
            'value': `${tag}`,
            'count': getRandomArbitrary(15, 35)
        })
    )
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
                                    <NavLink to={`/collection/${item.collectionId}/item/${item._id}`}>
                                        <ListItem disablePadding classes='home-item'>
                                            <ListItemButton classes='home-item'>
                                                <ListItemIcon>
                                                    <InboxIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={item.name} sx={{ color: 'secondary.main' }} />
                                            </ListItemButton>
                                        </ListItem>
                                    </NavLink>
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