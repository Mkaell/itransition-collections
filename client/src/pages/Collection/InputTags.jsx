import { Autocomplete, Chip, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import TagIcon from '@mui/icons-material/Tag';
import { Utils } from '../../utils/utils';
const InputTags = ({ itemField, items, setItems }) => {

    const [receivers, setReceivers] = useState([]);

    useEffect(() => {
        setItems({
            ...items,
            ...items.field, [itemField]: receivers,
        });
    }, [receivers])

    return (
        <>
            <Autocomplete
                multiple
                sx={{ mt: 2 }}
                id="tags"
                options={[]}
                defaultValue={[]}
                freeSolo

                renderTags={(
                    value,
                    getTagProps
                ) =>
                    value.map((option, index) => {
                        setReceivers(value)
                        return (
                            <Chip
                                key={index}
                                icon={<TagIcon sx={{ fontSize: 10 }} />}
                                variant="outlined"
                                label={option}
                                {...getTagProps({ index })}
                            />
                        );
                    })
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={Utils.capitalized(itemField)}
                        placeholder="Create title"
                    />
                )}
            />
        </>
    )
}

export default InputTags