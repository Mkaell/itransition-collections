import TagIcon from '@mui/icons-material/Tag';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import BlockIcon from '@mui/icons-material/Block';
import { DataGrid, GridActionsCellItem, GridToolbar, useGridApiContext } from '@mui/x-data-grid';
import {
    randomCreatedDate,
    randomTraderName,
    randomUpdatedDate,
} from '@mui/x-data-grid-generator';
import { Alert, Avatar, Chip, Grid, Modal, Paper, Snackbar, Tooltip, Typography } from '@mui/material';
import ModalItems from './ModalItems';
import styled from '@emotion/styled';
import { fetchCollection, likeItem, updateItem } from '../../api';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Utils } from '../../utils/utils';
import { format } from 'date-fns'
import { columnsСonverter } from './columnsСonverter'
import { deleteItem } from '../../api';
import InfoAboutCollection from './InfoAboutCollection';
import { useSelector } from 'react-redux';

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    border: 0,
    background: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
    textAlign: 'center',
    color:
        theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(','),
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal',
    '& .MuiDataGrid-columnsContainer': {
        backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
    },
    '$ .MuiDataGrid-main': {
        borderTop: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
            }`,
    },
    '& .MuiDataGrid-iconSeparator': {
        display: 'none',
    },
    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
        borderRight: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
            }`,
    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
        borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
            }`,
    },
    '& .MuiDataGrid-cell--textLeft': {
        justifyContent: 'center'
    },
    '& .MuiDataGrid-cell--textRight': {
        justifyContent: 'center'
    },
    '& .MuiDataGrid-cell': {
        color:
            theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
    },
    '& .MuiPaginationItem-root': {
        borderRadius: 0,
    },
    '& .MuiDataGrid-booleanCell[data-value="true"]': {
        color: 'green',
    },
    '& .MuiDataGrid-booleanCell[data-value="false"]': {
        color: 'red',
    },

}));


function Collection() {
    const { _id } = useSelector(state => state.auth.authData.result)
    const [open, setOpen] = useState(false);
    const { idCollection } = useParams()
    const [columns, setColumns] = useState([])
    const [collection, setCollection] = useState([])
    const [items, setItems] = useState({});
    const [rows, setRows] = useState([])
    const [snackbar, setSnackbar] = useState(null);

    console.log(rows);
    useEffect(() => {
        try {
            const getInfoCollection = async () => {
                const coll = await fetchCollection(idCollection)
                setCollection(coll.data)
                setRows(coll.data.items)
            }
            getInfoCollection()
        } catch (error) {
            console.log(error)
        }

    }, [])

    const basicFieldsEntries = useMemo(
        () => Object.keys(collection.itemFields?.basic || {}),
        [collection.itemFields?.basic]
    );

    const additionalFieldsEntries = useMemo(
        () => Object.entries(collection.itemFields?.additional || {}),
        [collection]
    );

    useEffect(() => {
        const columnsObj = columnsСonverter(additionalFieldsEntries, basicFieldsEntries, deleteCurrentItem, likeIthemByCurrentUser, _id)
        setColumns(columnsObj);
    }, [additionalFieldsEntries, basicFieldsEntries])


    const handleClickOpen = () => {
        setOpen(true);
    };
    const clearFormItem = () => {
        setItems({})
    }
    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseSnackbar = () => setSnackbar(null);

    const deleteCurrentItem = useCallback(
        (id) => () => {
            setTimeout(() => {
                try {
                    (async () => {
                        await deleteItem(id)
                    })()
                    setRows((prevRows) => prevRows.filter((row) => row._id !== id));
                } catch (error) {
                    console.log(error);
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

            if (!usersByLikes.includes(_id)) {
                usersByLikes.push(_id)
                try {
                    ;
                    const response = await likeItem(id, { usersByLikes })
                    console.log(response)
                    setRows((prevRows) =>
                        prevRows.map((row) =>
                            row._id === id ? { ...row, usersByLikes: usersByLikes } : row,
                        ),
                    );
                } catch (error) {
                    setSnackbar({ children: error.message, severity: 'error' });
                }
            } else {
                const unlike = usersByLikes.filter(userId => userId !== _id)

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


    const handleProcessRowUpdateError = useCallback((error) => {
        setSnackbar({ children: error.message, severity: 'error' });
    }, []);

    return (
        <>
            <InfoAboutCollection collection={collection} handleClickOpen={handleClickOpen} />
            <div style={{ height: '400px', width: '100%', }}>
                <StyledDataGrid
                    rows={rows}
                    columns={columns}
                    processRowUpdate={processRowUpdate}
                    onProcessRowUpdateError={handleProcessRowUpdateError}
                    GridColDef='center'
                    getRowId={(row) => row._id}
                    components={{
                        Toolbar: GridToolbar
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
                    handleClose={handleClose}
                    open={open}
                    collection={collection}
                    items={items}
                    setItems={setItems}
                    clearFormItem={clearFormItem}
                    collectionId={idCollection}
                    setRows={setRows} />
            </div>
        </>

    );
}



export default Collection