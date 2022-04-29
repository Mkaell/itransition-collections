import { Avatar, Paper } from '@mui/material'
import { Box } from '@mui/system'
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

const Dropzone = ({ setCollection, collection }) => {
  const [images, setImages] = useState([])
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader()
      reader.onload = () => {
        setImages(prevState => [...prevState, reader.result])
        setCollection({ ...collection, collectionImage: reader.result });
      }
      reader.readAsDataURL(file)
    });
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg,image/png',
  })

  // useEffect(() => {
  //   console.log(images);
  // }, [images])

  return (
    <>
      <Box
        justifyContent="center"
        {...getRootProps()}
        sx={!images.length > 0 ?
          { p: 4, border: '1px dashed grey', textAlign: 'center', mt: 2 } :
          { display: 'flex', justifyContent: 'center', mt: 2 }}
      >
        <input {...getInputProps()} />
        {images.length > 0 ?
          <Box >
            {images.map((image, i) => <Avatar
              alt="img"
              key={i}
              src={image}
              sx={{ width: 200, height: 200 }}
            />)}
          </Box> :
          <>
            {isDragActive ? 'Drag active' : "Drag 'n' drop some files here, or click to select files"}
          </>

        }
      </Box>

    </>



  )
}

export default Dropzone