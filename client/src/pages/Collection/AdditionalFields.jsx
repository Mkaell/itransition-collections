import { Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import BooleanInput from './BooleanInput'
import DataPickerInput from './DataPicker'
import { Utils } from '../../utils/utils'

const AdditionalFields = ({ additionalFieldsKeys, collection, onChangeControl, items, setItems }) => {
    return (
        <>
            {additionalFieldsKeys?.map(
                (fieldName, index) =>
                    collection?.itemFields.additional[fieldName].length > 0 && (

                        fieldName === 'date' ?
                            <>
                                <Typography textAlign={'center'} mt={2} key={index}>
                                    {Utils.capitalized(fieldName)}
                                </Typography>
                                {collection?.itemFields.additional[fieldName].map(
                                    (itemField, fieldId) => (
                                        <DataPickerInput
                                            onChangeControl={onChangeControl}
                                            itemField={itemField}
                                            items={items}
                                            setItems={setItems}
                                            key={fieldId}
                                        />
                                    )
                                )}
                            </> :
                            <>
                                <Typography textAlign='center' mt={2}>
                                    {Utils.capitalized(fieldName)}
                                </Typography>
                                <Grid
                                    container
                                    justifyContent="center"
                                    alignItems="center">
                                    {collection?.itemFields.additional[fieldName].map(
                                        (itemField, fieldId) => (

                                            fieldName === 'boolean' ?

                                                <BooleanInput
                                                    itemField={itemField}
                                                    fieldId={fieldId}
                                                    items={items} setItems={setItems} />
                                                :
                                                <TextField
                                                    sx={{ mt: 2 }}
                                                    fullWidth
                                                    label={Utils.capitalized(itemField)}
                                                    key={fieldId}
                                                    type={
                                                        fieldName === 'numerical' ? 'number' : 'text'
                                                    }
                                                    name={itemField}
                                                    onChange={(e) => onChangeControl(e)} />
                                        )
                                    )}
                                </Grid>
                            </>
                    )
            )}
        </>
    )
}

export default AdditionalFields