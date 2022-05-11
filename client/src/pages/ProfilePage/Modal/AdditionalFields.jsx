import React, { useMemo, useState } from 'react'
import InputChip from '../InputChip/InputChip'
import { Utils } from '../../../utils/utils'
import { useIntl } from 'react-intl'
import { Typography } from '@mui/material'

const AdditionalFields = ({ collection, setCollection }) => {

    const { messages } = useIntl()

    const itemKeys = useMemo(() => Object.keys(collection.itemFields), [collection]);

    return (
        <>
            <Typography>{messages['profile.not-required']}</Typography>
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