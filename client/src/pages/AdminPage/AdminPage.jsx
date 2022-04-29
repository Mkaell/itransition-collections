import { useCallback, useEffect, useMemo, useState } from 'react';
import { DataGrid, GridActionsCellItem, GridToolbar, GridToolbarFilterButton } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import BlockIcon from '@mui/icons-material/Block';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers, updateAdminStatus, updateBanStatus } from '../../store/actionCreators/usersCreator';
import { deleteUsers, changeAdminStatusOfSelected, changeActiveStatusOfSelected } from '../../api';
import { actionLogOut } from '../../store/actionCreators/auth';
import { useNavigate } from 'react-router-dom';
import { Paper, Tooltip } from '@mui/material';
import { style } from './styled';
import { EnhancedTableToolbar } from './ToolBar';
import { format } from 'date-fns'


const StyledDataGrid = style


const AdminPage = () => {

    const { isLoading, users } = useSelector(state => state.users)
    const { _id } = useSelector(state => state.auth.authData.result)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [selected, setSelected] = useState([]);
    const [rows, setRows] = useState(users);
    console.log(isLoading);

    useEffect(() => {
        dispatch(getUsers())
            .then(res => setRows(res))

    }, [])

    function redirectLogin(id, _id) {
        if (id === _id) {
            dispatch(actionLogOut());
            navigate('/login')
        }
    }

    function redirectSelected(_id, selectedUsers) {
        if (selectedUsers.includes(_id)) {
            dispatch(actionLogOut());
            navigate('/login')
        }
    }

    const deleteAccount = useCallback(
        (id) => () => {
            setTimeout(() => {
                dispatch(deleteUser(id))
                redirectLogin(id, _id)
                setRows((prevRows) => prevRows.filter((row) => row._id !== id));
            });
        },
        [_id, dispatch],
    );

    const deleteAccounts = useCallback(
        (selectedUsers) => async () => {
            try {
                await deleteUsers({ ids: selectedUsers })
                redirectSelected(_id, selectedUsers)
                const selectedIDs = new Set(selectedUsers);
                setRows((prevRows) => prevRows.filter((row) => !selectedIDs.has(row._id)));
            } catch (error) {
                console.log(error);
            }
        },
        [_id]
    );

    const toggleAdminStatus = useCallback(
        (id, role) => () => {
            dispatch(updateAdminStatus(id, { role: !role }))
            redirectLogin(id, _id)
            setRows((prevRows) =>
                prevRows.map((row) =>
                    row._id === id ? { ...row, role: !row.role } : row,
                ),
            );
        },
        [_id, dispatch],
    );

    const toggleAdminStatusOfSelected = useCallback(
        (selectedUsers) => async () => {
            try {
                await changeAdminStatusOfSelected({ ids: selectedUsers })
                redirectSelected(_id, selectedUsers)
                setRows((prevRows) =>
                    prevRows.map((row) =>
                        selectedUsers.includes(row._id) ? { ...row, role: !row.role } : row,
                    ),
                );
            } catch (error) {
                console.log(error);
            }
        },
        [_id],
    );

    const toggleActiveStatus = useCallback(
        (id, active) => () => {
            dispatch(updateBanStatus(id, { active: !active }))
            redirectLogin(id, _id)
            setRows((prevRows) =>
                prevRows.map((row) =>
                    row._id === id ? { ...row, active: !row.active } : row,
                ),
            );
        },
        [_id, dispatch],
    );

    const toggleActiveStatusOfSelected = useCallback(
        (selectedUsers) => async () => {
            try {
                await changeActiveStatusOfSelected({ ids: selectedUsers })
                redirectSelected(_id, selectedUsers)
                setRows((prevRows) =>
                    prevRows.map((row) =>
                        selectedUsers.includes(row._id) ? { ...row, active: !row.active } : row,
                    ),
                );
            } catch (error) {
                console.log(error);
            }
        },
        [_id],
    );
    // 
    const columns = useMemo(
        () => [
            { field: '_id', headerName: 'ID', type: 'string', flex: 0.2, headerAlign: 'center', },
            { field: 'email', headerName: 'Email', type: 'string', flex: 0.3, headerAlign: 'center', },
            {
                field: 'created_at', headerName: 'Created_at', type: 'dateTime', flex: 0.3, headerAlign: 'center',
                valueFormatter: (params) => {
                    const valueFormatted = format(new Date(params.value), "HH:mm:ss'/'yyyy-MM-dd");
                    return valueFormatted
                },
            },

            {
                field: 'lastLogin', headerName: 'Last_login', type: 'dateTime', flex: 0.3, headerAlign: 'center',
                valueFormatter: (params) => {
                    const valueFormatted = format(new Date(params.value), "HH:mm:ss'/'yyyy-MM-dd");
                    return valueFormatted
                },
            },
            { field: 'role', headerName: 'IsAdmin', type: 'boolean', flex: 0.2, headerAlign: 'center', },
            { field: 'active', headerName: 'IsActive', type: 'boolean', flex: 0.2, headerAlign: 'center', },
            {
                field: 'actions',
                type: 'actions',
                headerName: 'Actions',
                flex: 0.2,
                headerAlign: 'center',
                getActions: (params) => [
                    <GridActionsCellItem
                        icon={
                            <Tooltip title="Delete user">
                                <DeleteIcon />
                            </Tooltip>
                        }
                        label="Delete"
                        onClick={deleteAccount(params.id)}
                    />,
                    <GridActionsCellItem
                        icon={
                            <Tooltip title="Toggle Admin">
                                <SecurityIcon />
                            </Tooltip>
                        }
                        label="Toggle Admin"
                        onClick={toggleAdminStatus(params.id, params.row.role)}
                    />,
                    <GridActionsCellItem
                        icon={
                            <Tooltip title="Ban/Unban user">
                                <BlockIcon />
                            </Tooltip>
                        }
                        label="Ban/Unban user"
                        onClick={toggleActiveStatus(params.id, params.row.active)}
                    />,
                ],
            },
        ],
        [deleteAccount, toggleAdminStatus, toggleActiveStatus],
    );

    return (
        <Paper>
            <div style={{ height: 400, width: '100%', marginTop: '100px', }}>
                <StyledDataGrid
                    components={{
                        Toolbar: EnhancedTableToolbar,
                    }}
                    loading={isLoading}
                    onSelectionModelChange={(ids) => {
                        setSelected(ids);
                    }}
                    componentsProps={{
                        toolbar: {
                            deleteAccounts,
                            selected,
                            toggleAdminStatusOfSelected,
                            toggleActiveStatusOfSelected
                        },
                    }}
                    hideFooterSelectedRowCount={true}
                    GridColDef={'center'}
                    columns={columns}
                    rows={rows}
                    checkboxSelection={true}
                    getRowId={(row) => row._id}
                />
            </div>
        </Paper>
    );

}

export default AdminPage