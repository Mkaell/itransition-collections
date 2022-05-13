import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { TagCloud } from 'react-tagcloud'
import { getItemsByTag } from '../../store/actionCreators/searchCreator'

const options = {
    luminosity: 'light',
    hue: 'purple',
}

const SimpleCloud = ({ lastAddedItems }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const findItems = useCallback(
        (tag) => {
            dispatch(getItemsByTag({ searchedData: tag }))
                .then(
                    navigate('/items')
                )
        },
        [],
    )


    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    let tagsCloud = []

    let items = lastAddedItems?.map((item) => tagsCloud.concat(item?.tags)).flat()
    Array.from(new Set(items)).forEach((tag) =>
        tagsCloud.push({
            'value': `${tag}`,
            'count': getRandomArbitrary(15, 35)
        })
    )

    return (
        <TagCloud
            minSize={15}
            maxSize={35}
            style={{ width: '300px', textAlign: 'center' }}
            colorOptions={options}
            className='simple-cloud'
            tags={tagsCloud}
            onClick={tag => findItems(tag?.value)}
        />
    )

}

export default SimpleCloud