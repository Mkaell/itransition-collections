import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers, updateAdminStatus, updateBanStatus } from '../../store/actionCreators/usersCreator';
import { deleteUsers, changeAdminStatusOfSelected, changeActiveStatusOfSelected } from '../../api';
import { actionLogOut } from '../../store/actionCreators/auth';
import { useNavigate } from 'react-router-dom';
import { Paper, } from '@mui/material';
import { StyledDataGrid } from './style';
import { EnhancedTableToolbar } from './ToolBar';
import { useIntl } from 'react-intl';
import { columnsConverter } from './Columns/columns';

const AdminPage = () => {

    const { isLoading, users } = useSelector(state => state?.users)
    const { _id } = useSelector(state => state.auth.authData?.result)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [selected, setSelected] = useState([]);
    const [rows, setRows] = useState(users);
    const { messages } = useIntl()

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

    const columns = useMemo(() =>
        columnsConverter(messages, deleteAccount, toggleAdminStatus, toggleActiveStatus),
        [messages, deleteAccount, toggleAdminStatus, toggleActiveStatus])

    return (
        <Paper elevation={5}>
            <div style={{ height: 400, width: '100%', marginTop: '100px', }}>
                <StyledDataGrid
                    autoPageSize
                    loading={isLoading}
                    onSelectionModelChange={(ids) => {
                        setSelected(ids);
                    }}
                    componentsProps={{
                        toolbar: {
                            deleteAccounts,
                            selected,
                            toggleAdminStatusOfSelected,
                            toggleActiveStatusOfSelected,
                            messages
                        },
                    }}
                    localeText={{
                        toolbarFilters: messages['admin.filter'],
                        toolbarFiltersTooltipShow: messages['admin.show-filters'],
                        toolbarFiltersTooltipHide: messages['admin.hide-filters'],
                        filterPanelDeleteIconLabel: messages['admin.delete-icon'],
                        filterPanelOperators: messages['admin.operator'],
                        filterPanelColumns: messages['admin.columns'],
                        filterPanelInputLabel: messages['admin.value'],
                        filterPanelInputPlaceholder: messages['admin.filter-value'],
                        filterOperatorContains: messages['admin.contains'],
                        filterOperatorEquals: messages['admin.equals'],
                        filterOperatorStartsWith: messages['admin.starts-with'],
                        filterOperatorEndsWith: messages['admin.ends-with'],
                        filterOperatorIsEmpty: messages['admin.is-empty'],
                        filterOperatorIsNotEmpty: messages['admin.is-not-empty'],
                        filterOperatorIsAnyOf: messages['admin.is-any-of'],
                        columnMenuLabel: messages['admin.menu-label'],
                        columnMenuShowColumns: messages['admin.show-columns'],
                        columnMenuFilter: messages['admin.filter-label'],
                        columnMenuHideColumn: messages['admin.hide'],
                        columnMenuUnsort: messages['admin.unsort'],
                        columnMenuSortAsc: messages['admin.sort-by-ASC'],
                        columnMenuSortDesc: messages['admin.sort-by-DESC'],
                        columnHeaderSortIconLabel: messages['admin.sort-label'],
                    }}
                    components={{
                        Toolbar: EnhancedTableToolbar,
                    }}
                    hideFooterSelectedRowCount={true}
                    GridColDef='center'
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