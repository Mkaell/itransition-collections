import { Button, Card, CardActions, CardContent, CardMedia, Divider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CollectionCard from '../../components/Card/CollectionCard';


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

const data = [
    { value: 'JavaScript', count: 38 },
    { value: 'React', count: 30 },
    { value: 'Nodejs', count: 28 },
    { value: 'Express.js', count: 25 },
    { value: 'HTML5', count: 33 },
    { value: 'MongoDB', count: 18 },
    { value: 'CSS3', count: 20 },
]
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
    console.log(lastAddedItems);
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

                <SimpleCloud data={tagsCloudi} />
            </div>
            <Divider sx={{ mt: 5 }} />
            <div className='home-wrapper'>
                <div className='home-collections'>
                    {
                        largestCollections.map((collection) =>
                            <CollectionCard
                                key={collection._id}
                                image={collection.image}
                                description={collection.description}
                                name={collection.name}
                                theme={collection.theme}
                                id={collection._id} />
                        )
                    }

                </div>
                <Divider orientation="vertical" flexItem />
                <div className='home-items'>
                    {
                        lastAddedItems.map((item) =>
                            <CollectionCard
                                name={item.name}
                                key={item._id}
                                id={item.collectionId} />
                        )
                    }
                </div>
            </div>
        </div>

    )
}

export default HomePage