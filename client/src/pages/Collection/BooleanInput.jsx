import { Checkbox, FormControlLabel } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Utils } from '../../utils/utils';

const BooleanInput = ({ itemField, items, setItems, fieldId }) => {

    const [checked, setChecked] = useState(false)

    useEffect(() => {
        setItems({
            ...items,
            ...items.field, [itemField]: checked,
        });

    }, [checked, itemField, items, setItems])

    return (
        <FormControlLabel
            mt={2}
            value={checked}
            key={fieldId}
            control={
                <Checkbox
                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                />}
            name={itemField}
            label={Utils.capitalized(itemField)}
            labelPlacement="top"
            onChange={() => setChecked(!checked)}
        />
    )
}

export default BooleanInput