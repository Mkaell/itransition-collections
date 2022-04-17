import * as React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';


const initialRows = [
    {
        id: 1,
        name: 'Damien',
        age: 25,
        isAdmin: true,
        country: 'Spain',
        discount: '',
    },
    {
        id: 2,
        name: 'Nicolas',
        age: 36,
        isAdmin: false,
        country: 'France',
        discount: '',
    },
    {
        id: 3,
        name: 'Kate',
        age: 19,
        isAdmin: false,
        country: 'Brazil',
        discount: 'junior',
    },
    {
        id: 10,
        name: 'Damien',
        age: 25,
        isAdmin: true,
        country: 'Spain',
        discount: '',
    },
    {
        id: 20,
        name: 'Nicolas',
        age: 36,
        isAdmin: false,
        country: 'France',
        discount: '',
    },
    {
        id: 30,
        name: 'Kate',
        age: 19,
        isAdmin: false,
        country: 'Brazil',
        discount: 'junior',
    },
];

const Collection = () => {

    const [rows, setRows] = React.useState(initialRows);

    const deleteUser = React.useCallback(
        (id) => () => {
            setTimeout(() => {
                setRows((prevRows) => prevRows.filter((row) => row.id !== id));
            });
        },
        [],
    );

    const toggleAdmin = React.useCallback(
        (id) => () => {
            setRows((prevRows) =>
                prevRows.map((row) =>
                    row.id === id ? { ...row, isAdmin: !row.isAdmin } : row,
                ),
            );
        },
        [],
    );

    const columns = React.useMemo(
        () => [
            { field: 'name', type: 'string', editable: true },
            { field: 'age', type: 'number', editable: true },
            { field: 'dateCreated', type: 'date', width: 130, editable: true },
            { field: 'lastLogin', type: 'dateTime', width: 180, editable: true },
            { field: 'isAdmin', type: 'boolean', width: 120, editable: true },
            {
                field: 'country',
                type: 'singleSelect',
                width: 120,
                valueOptions: [
                    'Bulgaria',
                    'Netherlands',
                    'France',
                    'United Kingdom',
                    'Spain',
                    'Brazil',
                ],
                editable: true
            },
            {
                field: 'discount',
                type: 'singleSelect',
                width: 120,
                editable: true,
                valueOptions: ({ row }) => {
                    if (row === undefined) {
                        return ['EU-resident', 'junior'];
                    }
                    const options = [];
                    if (!['United Kingdom', 'Brazil'].includes(row.country)) {
                        options.push('EU-resident');
                    }
                    if (row.age < 27) {
                        options.push('junior');
                    }
                    return options;
                },
            },
            {
                field: 'actions',
                type: 'actions',
                width: 80,
                getActions: (params) => [
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={deleteUser(params.id)}
                    />,
                    <GridActionsCellItem
                        icon={<SecurityIcon />}
                        label="Toggle Admin"
                        onClick={toggleAdmin(params.id)}
                        showInMenu
                    />,
                ],
            },
        ],
        [deleteUser, toggleAdmin],
    );
    return (
        <div style={{ height: 500, width: '100%', marginTop: '100px' }}>
            <DataGrid
                editMode="row"
                columns={columns}
                rows={rows}
                experimentalFeatures={{ newEditingApi: true }} />
        </div>
    )
}

export default Collection