// import * as React from "react";
// import IconButton from "@mui/material/IconButton";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import DeleteIcon from "@mui/icons-material/Delete";

// const _rows = [
//     { id: 1, col1: "Hello", col2: "World" },
//     { id: 2, col1: "XGrid", col2: "is Awesome" },
//     { id: 3, col1: "Material-UI", col2: "is Amazing" },
//     { id: 4, col1: "Hello", col2: "World" },
//     { id: 5, col1: "XGrid", col2: "is Awesome" },
//     { id: 6, col1: "Material-UI", col2: "is Amazing" }
// ];

import * as React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import axios from 'axios';


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
];
const AdminPage = () => {

    // const [rows, setRows] = React.useState(_rows);
    // const [selectionModel, setSelectionModel] = React.useState([]);
    // const columns = [
    //     { field: "col1", headerName: "Column 1", width: 150 },
    //     { field: "col2", headerName: "Column 2", width: 150 },
    //     {
    //         field: "delete",
    //         width: 75,
    //         sortable: false,
    //         disableColumnMenu: true,
    //         renderHeader: () => {
    //             return (
    //                 <IconButton
    //                     onClick={() => {
    //                         const selectedIDs = new Set(selectionModel);
    //                         // you can call an API to delete the selected IDs
    //                         // and get the latest results after the deletion
    //                         // then call setRows() to update the data locally here
    //                         setRows((r) => r.filter((x) => !selectedIDs.has(x.id)));
    //                     }}
    //                 >
    //                     <DeleteIcon />
    //                 </IconButton>
    //             );
    //         }
    //     }
    // ];
    const [rows, setRows] = React.useState([]);

    React.useEffect(() => {
        const getuser = async () => {
            try {
                const res = await axios.get('http://localhost:5047/users/getUsers')
                console.log(res.data);
                setRows(res.data)
            } catch (error) {
                alert(error)
            }
        }
        getuser()
    }, [])

    const deleteUser = React.useCallback(
        (id) => () => {
            setTimeout(() => {
                setRows((prevRows) => prevRows.filter((row) => row._id !== id));
            });
        },
        [],
    );

    const toggleAdmin = React.useCallback(
        (id) => () => {
            setRows((prevRows) =>
                prevRows.map((row) =>
                    row._id === id ? { ...row, role: !row.role } : row,
                ),
            );
        },
        [],
    );
    const toggleActive = React.useCallback(
        (id) => () => {
            setRows((prevRows) =>
                prevRows.map((row) =>
                    row._id === id ? { ...row, active: !row.active } : row,
                ),
            );
        },
        [],
    );

    const duplicateUser = React.useCallback(
        (id) => () => {
            setRows((prevRows) => {
                const rowToDuplicate = prevRows.find((row) => row.id === id);
                return [...prevRows, { ...rowToDuplicate, id: Date.now() }];
            });
        },
        [],
    );

    const columns = React.useMemo(
        () => [
            { field: '_id', headerName: 'ID', type: 'string', width: 220 },
            { field: 'email', type: 'string', width: 220 },
            // { field: 'dateCreated', type: 'date', width: 130 },
            // { field: 'lastLogin', type: 'dateTime', width: 180 },
            { field: 'role', headerName: 'isAdmin', type: 'boolean', width: 120 },
            { field: 'active', headerName: 'isActive', type: 'boolean', width: 120 },
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
                    <GridActionsCellItem
                        icon={<FileCopyIcon />}
                        label="Ban User"
                        onClick={toggleActive(params.id)}
                        showInMenu
                    />,
                ],
            },
        ],
        [deleteUser, toggleAdmin, toggleActive],
    );

    return (
        // <div style={{ height: 400, width: "100%", marginTop: '3rem' }}>
        //     <h3>Users list</h3>
        //     <DataGrid
        //         rows={rows}
        //         components={{
        //             Toolbar: GridToolbar,
        //         }}
        //         columns={columns}
        //         checkboxSelection
        //         onSelectionModelChange={(ids) => {
        //             setSelectionModel(ids);
        //         }}
        //     />
        // </div>
        <div style={{ height: 300, width: '100%', marginTop: '100px', }}>
            <DataGrid style={{ textAlign: 'center' }} columns={columns} rows={rows} checkboxSelection={true} getRowId={(row) => row._id} />
        </div>
    );

}

export default AdminPage