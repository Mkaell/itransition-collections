import React, { useMemo, useState } from 'react'
import InputChip from '../InputChip/InputChip'


const AdditionalFields = ({ collection, setCollection }) => {

    const itemKeys = useMemo(() => Object.keys(collection.itemFields), [
        collection,
    ]);

    const fieldCapitalized = (field) => {
        return field.charAt(0).toUpperCase() + field.slice(1)
    }

    return (
        <>
            {itemKeys.map((field, index) => (
                <InputChip
                    key={index}
                    field={field}
                    name={`${fieldCapitalized(field)} fields`}
                    collection={collection}
                    setCollection={setCollection} />
            ))}
        </>
    )
}

export default AdditionalFields