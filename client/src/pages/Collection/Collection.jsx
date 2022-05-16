import Box from '@mui/material/Box';
import { Alert, Paper, Snackbar } from '@mui/material';
import ModalItems from './ModalItems';
import { createItem, deleteItem, likeItem, updateCollection, updateItem } from '../../api';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { columnsСonverter } from './Columns/columnsСonverter'
import InfoAboutCollection from './InfoAboutCollection';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import CustomToolbar from './CustomToolbar';
import { CustomNoRowsOverlay } from './style';
import { StyledDataGrid } from './style';
import { getCollection } from '../../store/actionCreators/collectionsCreator';

function Collection() {

    const currentUser = useSelector(state => state.auth.authData?.result);
    const { isLoading } = useSelector(state => state?.collections);
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const { idCollection } = useParams()
    const [columns, setColumns] = useState([])
    const [collection, setCollection] = useState([])
    const [items, setItems] = useState({});
    const [rows, setRows] = useState([])
    const [snackbar, setSnackbar] = useState(null);
    const { messages } = useIntl()

    useEffect(() => {
        dispatch(getCollection(idCollection))
            .then(data => {
                setCollection(data)
                setRows(data.items)
            })
    }, [dispatch, idCollection])

    useEffect(() => {
        (async () => {
            try {
                await updateCollection(collection._id, collection)
            } catch (error) {
                console.log(error);
            }
        })()
    }, [collection])

    const basicFieldsEntries = useMemo(
        () => Object.keys(collection.itemFields?.basic || {}),
        [collection.itemFields?.basic]
    );

    const additionalFieldsEntries = useMemo(
        () => Object.entries(collection.itemFields?.additional || {}),
        [collection]
    );

    useEffect(() => {
        const columnsObj = columnsСonverter(
            additionalFieldsEntries,
            basicFieldsEntries,
            deleteCurrentItem,
            likeIthemByCurrentUser,
            currentUser,
            collection,
            messages)
        setColumns(columnsObj);
    }, [additionalFieldsEntries, basicFieldsEntries, collection, currentUser, messages])

    const handleClickOpen = () => {
        setOpen(true);
    };
    const clearFormItem = () => {
        setItems({})
    }
    const handleClose = () => {
        setOpen(false);
        clearFormItem()
    };

    const handleCloseSnackbar = () => setSnackbar(null);

    const deleteCurrentItem = useCallback(
        (id, collectionId) => () => {
            setTimeout(async () => {
                try {
                    await deleteItem(id, collectionId);
                    setRows((prevRows) => prevRows.filter((row) => row._id !== id));
                } catch (error) {
                    alert(error)
                }
            });
        },
        [],
    );

    const processRowUpdate = useCallback(
        async (newRow) => {
            try {
                const response = await updateItem(newRow._id, newRow)
                setSnackbar({ children: response.data.message, severity: 'success' });
            } catch (error) {
                setSnackbar({ children: error.message, severity: 'error' });
            }

            return newRow
        },
        [],
    );

    const likeIthemByCurrentUser = useCallback(
        async (id, usersByLikes) => {
            if (!usersByLikes.includes(currentUser?._id)) {
                usersByLikes.push(currentUser?._id)
                try {
                    await likeItem(id, { usersByLikes })
                    setRows((prevRows) =>
                        prevRows.map((row) =>
                            row._id === id ? { ...row, usersByLikes: usersByLikes } : row,
                        ),
                    );
                } catch (error) {
                    setSnackbar({ children: error.message, severity: 'error' });
                }
            } else {
                const unlike = usersByLikes.filter(userId => userId !== currentUser?._id)

                try {
                    await likeItem(id, { usersByLikes: unlike })
                    setRows((prevRows) =>
                        prevRows.map((row) =>
                            row._id === id ? { ...row, usersByLikes: unlike } : row,
                        ),
                    );
                } catch (error) {
                    setSnackbar({ children: error.message, severity: 'error' });
                }
            }
        },
        [],
    );
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await createItem({ ...items, collectionId: idCollection, userId: collection.userId })
            setRows(response.data.items)
        } catch (error) {
            console.log(error);
        }
        clearFormItem()
        handleClose()
    }

    const handleProcessRowUpdateError = useCallback((error) => {
        setSnackbar({ children: error.message, severity: 'error' });
    }, []);

    return (
        <>
            <InfoAboutCollection
                collection={collection}
                handleClickOpen={handleClickOpen}
                setCollection={setCollection}
                nameCollection={collection.name}
                descriptionCollection={collection.descriptionCollection}
            />
            <Paper elevation={5}>
                <Box style={{ height: '430px', width: '100%', marginTop: '10px' }}>
                    <StyledDataGrid
                        rows={rows}
                        loading={isLoading}
                        columns={columns}
                        autoPageSize
                        processRowUpdate={processRowUpdate}
                        onProcessRowUpdateError={handleProcessRowUpdateError}
                        GridColDef='center'
                        getRowId={(row) => row._id}
                        components={{
                            Toolbar: CustomToolbar,
                            NoRowsOverlay: CustomNoRowsOverlay,
                        }}
                        localeText={{
                            toolbarFilters: messages['admin.filter'],
                            toolbarExport: messages['collection.export'],
                            toolbarExportCSV: messages['collection.download'],
                            toolbarExportPrint: messages['collection.print'],
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
                        experimentalFeatures={{ newEditingApi: true }}
                    />
                    {!!snackbar && (
                        <Snackbar
                            open
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                            onClose={handleCloseSnackbar}
                            autoHideDuration={6000}
                        >
                            <Alert {...snackbar} onClose={handleCloseSnackbar} />
                        </Snackbar>
                    )}
                    <ModalItems
                        handleSubmit={handleSubmit}
                        handleClose={handleClose}
                        setOpen={setOpen}
                        open={open}
                        collection={collection}
                        items={items}
                        setItems={setItems}
                        clearFormItem={clearFormItem}
                        collectionId={idCollection}
                        setRows={setRows} />
                </Box>
            </Paper>

        </>

    );
}



export default Collection