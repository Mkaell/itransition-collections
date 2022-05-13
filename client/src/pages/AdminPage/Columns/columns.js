import { Tooltip } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import BlockIcon from '@mui/icons-material/Block';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export function columnsConverter (messages, deleteAccount, toggleAdminStatus, toggleActiveStatus){   
    return [
    { field: '_id', headerName: 'ID', type: 'string', width: 100, headerAlign: 'center', },
    { field: 'email', headerName: 'Email', type: 'string', width: 250, headerAlign: 'center', },
    {
        field: 'created_at', headerName: 'Created_at', type: 'dateTime', width: 150, headerAlign: 'center',
        valueFormatter: (params) => {
            const valueFormatted = format(new Date(params.value), "HH:mm:ss'/'yyyy-MM-dd");
            return valueFormatted
        },
    },
    {
        field: 'lastLogin', headerName: 'Last_login', type: 'dateTime', width: 150, headerAlign: 'center',
        valueFormatter: (params) => {
            const valueFormatted = format(new Date(params.value), "HH:mm:ss'/'yyyy-MM-dd");
            return valueFormatted
        },
    },
    { field: 'role', headerName: 'IsAdmin', type: 'boolean', width: 80, headerAlign: 'center', },
    { field: 'active', headerName: 'IsActive', type: 'boolean', width: 80, headerAlign: 'center', },
    {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        minWidth: 150,
        headerAlign: 'center',
        getActions: (params) => [
            <GridActionsCellItem
                icon={
                    <Tooltip title={messages['admin.profile']} placement="top">
                        <Link to={`/${params.row.email}/${params.id}`}>
                            <AccountCircleIcon />
                        </Link>

                    </Tooltip>
                }
                label="Delete"

            />,
            <GridActionsCellItem
                icon={
                    <Tooltip title={messages['admin.delete']} placement="top">
                        <DeleteIcon />
                    </Tooltip>
                }
                label="Delete"
                onClick={deleteAccount(params.id)}
            />,
            <GridActionsCellItem
                icon={
                    <Tooltip title={messages['admin.toggle']} placement="top">
                        <SecurityIcon />
                    </Tooltip>
                }
                label="Toggle Admin"
                onClick={toggleAdminStatus(params.id, params.row.role)}
            />,
            <GridActionsCellItem
                icon={
                    <Tooltip title={messages['admin.ban-unban']} placement="top">
                        <BlockIcon />
                    </Tooltip>
                }
                label="Ban/Unban user"
                onClick={toggleActiveStatus(params.id, params.row.active)}
            />,
        ],
    },
]}