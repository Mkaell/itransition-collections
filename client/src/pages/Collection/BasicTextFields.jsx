import { TextField } from '@mui/material'
import React from 'react'
import { Utils } from '../../utils/utils'
import InputTags from './InputTags'

const BasicTextFields = ({ basiclFieldsKeys, items, setItems, onChangeControl }) => {
    return (
        <>
            {
                basiclFieldsKeys.map((itemField, index) => (
                    itemField === 'tags' ?
                        <InputTags itemField={itemField} key={index} items={items} setItems={setItems} /> :
                        !(itemField === 'id') ?
                            <TextField
                                label={Utils.capitalized(itemField)}
                                required
                                sx={{ mt: 2 }}
                                key={index}
                                name={itemField}
                                onChange={(e) => onChangeControl(e)} />
                            :
                            null
                ))
            }
        </>
    )


}

export default BasicTextFields