import { Tooltip } from '@mui/material'
import { GridActionsCellItem } from '@mui/x-data-grid'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';


const ActionButtons = ({ params, deleteCurrentItem, likeIthemByCurrentUser, currentUser, collection, messages }) => {

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
                                        color: params.row.usersByLikes.includes(currentUser?._id) ? 'red' : 'palette.action.active'
                                    }}
                                />
                            }
                            label="Like"
                            onClick={() => likeIthemByCurrentUser(params.id, params.row.usersByLikes)}
                        />
                    </>

                    :
                    <GridActionsCellItem
                        icon={
                            <FavoriteIcon
                                sx={{
                                    fontSize: '35px',
                                    color: params.row.usersByLikes.includes(currentUser?._id) ? 'red' : 'white'
                                }}
                            />
                        }
                        label="Like"
                        onClick={() => likeIthemByCurrentUser(params.id, params.row.usersByLikes)}
                    />

            }
        </>
    )
}

export default ActionButtons