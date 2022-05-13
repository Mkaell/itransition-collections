import { Autocomplete, Chip, TextField } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'

const InputChip = ({ collection, name, field, setCollection }) => {

  const [receivers, setReceivers] = useState([]);

  useEffect(() => {
    setCollection({
      ...collection,
      itemFields: {
        ...collection.itemFields,
        [field]: receivers,
      },
    });
  }, [receivers])

  return (
    <Autocomplete
      multiple
      sx={{ mt: 2, minWidth: '250px' }}
      id="tags-filled"
      options={[]}
      defaultValue={[]}
      freeSolo
      renderTags={(
        value,
        getTagProps
      ) =>
        value.map((option, index) => {
          setReceivers(value);
          return (
            <Chip
              key={index}
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
          label={name}
          placeholder="Creating a field name"
        />
      )}
    />
  );

}

export default InputChip