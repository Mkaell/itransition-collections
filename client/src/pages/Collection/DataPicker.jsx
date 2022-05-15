import React, { useEffect, useState } from 'react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Grid, TextField } from '@mui/material';
import { Utils } from '../../utils/utils';
import { format } from 'date-fns'

const DataPickerInput = ({ itemField, items, setItems }) => {
    const [date, setDate] = useState(null)

    useEffect(() => {
        setItems({
            ...items,
            ...items.field, [itemField]: format(new Date(date), "dd.MM.yyyy"),
        });
    }, [date])


    return (
        <Grid
            container
            mt={2}
            alignItems='center'
            justifyContent='center'
        >
            <LocalizationProvider dateAdapter={AdapterDateFns} >
                <DatePicker
                    name={itemField}
                    label={Utils.capitalized(itemField)}
                    value={date}
                    onChange={(e) => setDate(e)}
                    renderInput={(params) => <TextField {...params}
                        fullWidth
                    />}
                />
            </LocalizationProvider>
        </Grid >
    )
}

export default DataPickerInput