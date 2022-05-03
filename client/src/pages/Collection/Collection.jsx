import TagIcon from '@mui/icons-material/Tag';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import BlockIcon from '@mui/icons-material/Block';
import { DataGrid, GridActionsCellItem, useGridApiContext } from '@mui/x-data-grid';
import {
    randomCreatedDate,
    randomTraderName,
    randomUpdatedDate,
} from '@mui/x-data-grid-generator';
import AddIcon from '@mui/icons-material/Add';
import { Avatar, Chip, Grid, Modal, Paper, Tooltip, Typography } from '@mui/material';
import ModalItems from './ModalItems';
import styled from '@emotion/styled';
import { fetchCollection } from '../../api';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Utils } from '../../utils/utils';
import { format } from 'date-fns'
import { columnsСonverter } from './columnsСonverter'
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function EditToolbar(props) {
    const apiRef = useGridApiContext();
    const { selectedCellParams, setSelectedCellParams } = props;

    const handleClick = async () => {
        if (!selectedCellParams) {
            return;
        }
        const { id, field, cellMode } = selectedCellParams;
        if (cellMode === 'edit') {
            apiRef.current.stopCellEditMode({ id, field });
            setSelectedCellParams({ ...selectedCellParams, cellMode: 'view' });
        } else {
            apiRef.current.startCellEditMode({ id, field });
            setSelectedCellParams({ ...selectedCellParams, cellMode: 'edit' });
        }
    };

    const handleMouseDown = (event) => {
        // Keep the focus in the cell
        event.preventDefault();
    };

    return (
        <Box
            sx={{
                justifyContent: 'center',
                display: 'flex',
                borderBottom: 1,
                borderColor: 'divider',
            }}
        >
            <Button
                onClick={handleClick}
                onMouseDown={handleMouseDown}
                disabled={!selectedCellParams}
                color="primary"
            >
                {selectedCellParams?.cellMode === 'edit' ? 'Save' : 'Edit'}
            </Button>
        </Box>
    );
}

EditToolbar.propTypes = {
    selectedCellParams: PropTypes.any,
    setSelectedCellParams: PropTypes.func.isRequired,
};

function Collection() {
    const [selectedCellParams, setSelectedCellParams] = useState(null);
    const [open, setOpen] = useState(false);
    const { idCollection } = useParams()
    const [columns, setColumns] = useState([])
    const [collection, setCollection] = useState([])
    const [items, setItems] = useState({});
    const [rows, setRows] = useState([])
    console.log(items);
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
        const columnsObj = columnsСonverter(additionalFieldsEntries, basicFieldsEntries, deleteItem)
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
    const handleCellClick = useCallback((params) => {
        setSelectedCellParams(params);
    }, []);

    const handleCellEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleCellEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const deleteItem = useCallback(
        (id) => () => {
            setTimeout(() => {
                setRows((prevRows) => prevRows.filter((row) => row._id !== id));
            });
        },
        [],
    );

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Grid container >
                    <Avatar
                        alt="Remy Sharp"
                        src={collection.image}
                        sx={{ width: 100, height: 100 }}
                    />
                    <Grid xs>
                        <Typography>
                            {collection.name}
                        </Typography>
                        <Typography>
                            {collection.description}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => handleClickOpen()}
                    >
                        Add Item
                    </Button>
                </Grid>
            </div>
            <div style={{ height: 400, width: '100%', marginTop: '20px' }}>


                <DataGrid
                    rows={rows}
                    columns={columns}
                    onCellClick={handleCellClick}
                    onCellEditStart={handleCellEditStart}
                    onCellEditStop={handleCellEditStop}
                    getRowId={(row) => row._id}
                    components={{
                        Toolbar: EditToolbar,
                    }}
                    componentsProps={{
                        toolbar: {
                            selectedCellParams,
                            setSelectedCellParams,
                        },
                    }}
                    experimentalFeatures={{ newEditingApi: true }}
                />
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