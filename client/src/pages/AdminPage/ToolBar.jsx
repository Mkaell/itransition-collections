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
        toggleActiveStatusOfSelected, messages } = props;

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
                    <Tooltip title={messages["admin.delete-selected"]}>
                        <IconButton onClick={deleteAccounts(selected)} >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={messages["admin.toggle-admins"]}>
                        <IconButton onClick={toggleAdminStatusOfSelected(selected)}>
                            <SecurityIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={messages["admin.ban-unban-users"]}>
                        <IconButton onClick={toggleActiveStatusOfSelected(selected)}>
                            <BlockIcon />
                        </IconButton>
                    </Tooltip>
                </>
            ) : (
                <GridToolbarFilterButton />
            )}
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} {messages['admin.selected']}
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%', fontSize: '1rem' }}

                    component="div"
                >
                    {messages['admin.panel']}
                </Typography>
            )}
        </Toolbar>
    );
};