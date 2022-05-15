import { Tooltip } from '@mui/material'
import { GridActionsCellItem } from '@mui/x-data-grid'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LinkIcon from '@mui/icons-material/Link';
import { useNavigate } from 'react-router-dom';

const ActionButtons = ({ params, deleteCurrentItem, likeIthemByCurrentUser, currentUser, collection, messages }) => {

    const navigate = useNavigate()
    return (
        <>
            {
                (currentUser?.role || (collection.userId === currentUser._id)) ?
                    <>
                        <GridActionsCellItem
                            icon={
                                <Tooltip title={messages['collection.delete']}>
                                    <DeleteIcon sx={{ fontSize: '35px' }} />
                                </Tooltip>
                            }
                            label="Delete"
                            onClick={deleteCurrentItem(params.id, params.row.collectionId)}
                        />

                        <GridActionsCellItem
                            icon={
                                <FavoriteIcon
                                    sx={{
                                        fontSize: '35px',
                                        color: params.row.usersByLikes.includes(currentUser?._id) ? 'red' : 'palette.primary.main'
                                    }}
                                />
                            }
                            label="Like"
                            onClick={() => likeIthemByCurrentUser(params.id, params.row.usersByLikes)}
                        />
                        <GridActionsCellItem
                            icon={
                                <Tooltip title={messages['collection.link']}>
                                    <LinkIcon sx={{ fontSize: '35px' }} />
                                </Tooltip>
                            }
                            label="Link"
                            onClick={() => navigate(`/collection/${params.row.collectionId}/item/${params.id}`)}
                        />
                    </>

                    :
                    <>
                        <GridActionsCellItem
                            icon={
                                <Tooltip title={messages['collection.link']}>
                                    <LinkIcon sx={{ fontSize: '35px' }} />
                                </Tooltip>
                            }
                            label="Link"
                            onClick={() => navigate(`/collection/${params.row.collectionId}/item/${params.id}`)}
                        />
                        <GridActionsCellItem
                            icon={
                                <FavoriteIcon
                                    sx={{
                                        fontSize: '35px',
                                        color: params.row.usersByLikes.includes(currentUser?._id) ? 'red' : 'palette.primary.main'
                                    }}
                                />
                            }
                            label="Like"
                            onClick={() => likeIthemByCurrentUser(params.id, params.row.usersByLikes)}
                        />
                    </>


            }
        </>
    )
}

export default ActionButtons