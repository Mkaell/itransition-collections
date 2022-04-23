import { alpha, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { GridToolbarFilterButton } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import BlockIcon from '@mui/icons-material/Block';

export const EnhancedTableToolbar = (props) => {
    const {
        selected,
        deleteAccounts,
        toggleAdminStatusOfSelected,
        toggleActiveStatusOfSelected } = props;

    const numSelected = selected.length

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <>
                    <Tooltip title="Delete selected">
                        <IconButton onClick={deleteAccounts(selected)} >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Toggle admins">
                        <IconButton onClick={toggleAdminStatusOfSelected(selected)}>
                            <SecurityIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Ban/Unban users">
                        <IconButton onClick={toggleActiveStatusOfSelected(selected)}>
                            <BlockIcon />
                        </IconButton>
                    </Tooltip>
                </>
            ) : (
                <Tooltip title="Filter list">
                    <GridToolbarFilterButton />
                </Tooltip>
            )}
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Admin panel
                </Typography>
            )}
        </Toolbar>
    );
};