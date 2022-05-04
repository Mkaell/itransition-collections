import { Badge, Chip, Tooltip } from "@mui/material"
import { GridActionsCellItem } from "@mui/x-data-grid"
import { Utils } from "../../utils/utils"
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import BlockIcon from '@mui/icons-material/Block';
import FavoriteIcon from '@mui/icons-material/Favorite';

const currentUser =JSON.parse(localStorage.getItem('profile'))
console.log(currentUser);
export const columnsСonverter = (additionalFieldsEntries, basicFieldsEntries, deleteCurrentItem, likeIthemByCurrentUser) => {
    let like = 0
    const columnsObj = []
    columnsObj.push({
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        minWidth: 150,
        editable: false,
        headerAlign: 'center',
        getActions: (params) => [
            <GridActionsCellItem
                icon={
                    <Tooltip title="Delete item">
                        <DeleteIcon sx={{fontSize: '35px'}}/>
                    </Tooltip>
                }
                label="Delete"
                onClick={deleteCurrentItem(params.id)}
            />,

            <GridActionsCellItem
                icon={
                    <FavoriteIcon sx={{fontSize: '35px', color: params.row.usersByLikes.includes(currentUser.result._id) ? 'red' : 'white'}}/>
                }
                label="Like"
                onClick={() => likeIthemByCurrentUser(params.id, params.row.usersByLikes)}
            />,
        ]
    })
        basicFieldsEntries.map((fields) => {
            if (fields === 'id') {
                columnsObj.push({
                    'field': '_id',
                    headerName: 'ID',
                    editable: false,
                    minWidth: 50,
                })
            } else if (fields === 'tags') {
                columnsObj.push({
                    'field': fields,
                    editable: true,
                    minWidth: 200,
                    renderCell: (params) => (
                        params.formattedValue ?
                            <Chip
                                sx={{ p: 0 }}
                                label={params.formattedValue}
                                onClick={() => console.log(params)}
                            />

                            : null
                    ),
                })
            }
            else {
                columnsObj.push({
                    'field': fields,
                    minWidth: 150,
                    editable: true,
                })
            }

        })

        additionalFieldsEntries.map(fields => {
            if (fields[0] === 'numerical') {
                fields[1].map(field => {
                    columnsObj.push({
                        'field': field,
                        headerName: `${Utils.capitalized(field)}`,
                        type: 'number',
                        headerAlign: 'center',
                        minWidth: 150,
                        editable: true,
                    })
                })
            } else if (fields[0] === 'boolean') {
                fields[1].map(field => {
                    columnsObj.push({
                        'field': field,
                        headerName: `${Utils.capitalized(field)}`,
                        type: 'boolean',
                        headerAlign: 'center',
                        minWidth: 50,
                        editable: true,
                    })
                })
            } else if (fields[0] === 'date') {
                fields[1].map(field => {
                    columnsObj.push({
                        'field': field,
                        headerName: `${Utils.capitalized(field)}`,
                        type: 'date',
                        headerAlign: 'center',
                        minWidth: 150,
                        editable: true,
                    })
                })
            } else {
                fields[1].map(field => {
                    columnsObj.push({
                        'field': field,
                        headerName: `${Utils.capitalized(field)}`,
                        type: 'string',
                        headerAlign: 'center',
                        minWidth: 150,
                        editable: true,
                    })
                })
            }
        })
        
        
    return columnsObj
}