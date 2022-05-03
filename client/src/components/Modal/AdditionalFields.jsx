import React, { useMemo, useState } from 'react'
import InputChip from '../InputChip/InputChip'
import { Utils } from '../../utils/utils'

const AdditionalFields = ({ collection, setCollection }) => {

    const itemKeys = useMemo(() => Object.keys(collection.itemFields), [
        collection,
    ]);

    return (
        <>
            {itemKeys.map((field, index) => (
                <InputChip
                    key={index}
                    field={field}
                    name={`${Utils.capitalized(field)} fields`}
                    collection={collection}
                    setCollection={setCollection} />
            ))}
        </>
    )
}

export default AdditionalFields