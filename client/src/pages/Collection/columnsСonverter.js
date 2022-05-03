import { Chip, Tooltip } from "@mui/material"
import { GridActionsCellItem } from "@mui/x-data-grid"
import { Utils } from "../../utils/utils"
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import BlockIcon from '@mui/icons-material/Block';

export const columnsСonverter = (additionalFieldsEntries, basicFieldsEntries, deleteItem) => {
    const columnsObj = []
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
                    editable: true,
                    minWidth: 150,
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
                        editable: true,
                        minWidth: 150,
                    })
                })
            } else if (fields[0] === 'boolean') {
                fields[1].map(field => {
                    columnsObj.push({
                        'field': field,
                        headerName: `${Utils.capitalized(field)}`,
                        type: 'boolean',
                        headerAlign: 'center',
                        editable: true,
                        minWidth: 150,
                    })
                })
            } else if (fields[0] === 'date') {
                fields[1].map(field => {
                    columnsObj.push({
                        'field': field,
                        headerName: `${Utils.capitalized(field)}`,
                        type: 'date',
                        headerAlign: 'center',
                        editable: true,
                        minWidth: 150,
                    })
                })
            } else {
                fields[1].map(field => {
                    columnsObj.push({
                        'field': field,
                        headerName: `${Utils.capitalized(field)}`,
                        type: 'string',
                        headerAlign: 'center',
                        editable: true,
                        minWidth: 150,
                    })
                })
            }
        })
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
                        <Tooltip title="Delete user">
                            <DeleteIcon />
                        </Tooltip>
                    }
                    label="Delete"
                    onClick={deleteItem(params.id)}
                />,

                <GridActionsCellItem
                    icon={
                        <Tooltip title="Toggle Admin">
                            <SecurityIcon />
                        </Tooltip>
                    }
                    label="Toggle Admin"
                // onClick={toggleAdminStatus(params.id, params.row.role)}
                />,
                <GridActionsCellItem
                    icon={
                        <Tooltip title="Ban/Unban user">
                            <BlockIcon />
                        </Tooltip>
                    }
                    label="Ban/Unban user"
                // onClick={toggleActiveStatus(params.id, params.row.active)}
                />,
            ]
        })
        
    return columnsObj
}