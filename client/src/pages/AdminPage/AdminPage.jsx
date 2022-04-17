import * as React from "react";
import IconButton from "@mui/material/IconButton";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

const _rows = [
    { id: 1, col1: "Hello", col2: "World" },
    { id: 2, col1: "XGrid", col2: "is Awesome" },
    { id: 3, col1: "Material-UI", col2: "is Amazing" },
    { id: 4, col1: "Hello", col2: "World" },
    { id: 5, col1: "XGrid", col2: "is Awesome" },
    { id: 6, col1: "Material-UI", col2: "is Amazing" }
];

const AdminPage = () => {

    const [rows, setRows] = React.useState(_rows);
    const [selectionModel, setSelectionModel] = React.useState([]);
    const columns = [
        { field: "col1", headerName: "Column 1", width: 150 },
        { field: "col2", headerName: "Column 2", width: 150 },
        {
            field: "delete",
            width: 75,
            sortable: false,
            disableColumnMenu: true,
            renderHeader: () => {
                return (
                    <IconButton
                        onClick={() => {
                            const selectedIDs = new Set(selectionModel);
                            // you can call an API to delete the selected IDs
                            // and get the latest results after the deletion
                            // then call setRows() to update the data locally here
                            setRows((r) => r.filter((x) => !selectedIDs.has(x.id)));
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                );
            }
        }
    ];
    return (
        <div style={{ height: 400, width: "100%", marginTop: '3rem' }}>
            <h3>Users list</h3>
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
                onSelectionModelChange={(ids) => {
                    setSelectionModel(ids);
                }}
            />
        </div>
    );

}

export default AdminPage