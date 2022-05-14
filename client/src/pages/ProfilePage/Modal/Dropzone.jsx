import { Avatar, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useIntl } from 'react-intl'

const Dropzone = ({ setCollection, collection }) => {

	const [images, setImages] = useState([]);
	const { messages } = useIntl();

	const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
		acceptedFiles.forEach(file => {

			const reader = new FileReader()
			reader.onload = () => {
				setImages(prevState => [...prevState, reader.result])
				setCollection({ ...collection, collectionImage: reader.result });
			}
			reader.readAsDataURL(file)
		});
	}, [collection, setCollection])

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: 'image/jpeg,image/png',
	})

	return (
		<>
			<Typography>{messages['profile.image']}</Typography>
			<Box
				justifyContent="center"
				{...getRootProps()}
				sx={
					!images.length > 0 ?
						{ p: 4, border: '1px dashed grey', textAlign: 'center', mt: 2, minWidth: '200px' } :
						{ display: 'flex', justifyContent: 'center', mt: 2, minWidth: '200px' }}
			>
				<input {...getInputProps()} />
				{images.length > 0 ?
					<Box >
						{images.map((image, i) => <Avatar
							alt="img"
							key={i}
							src={image}
							sx={{ minWidth: 200, height: 200 }}
						/>)}
					</Box> :
					<>
						{isDragActive ?
							messages['profile.drag-and-drop-active'] :
							messages['profile.drag-and-drop']}
					</>
				}
			</Box>

		</>
	)
}

export default Dropzone