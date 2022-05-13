import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const StyledTextField = styled(TextField)(({ theme }) => ({
    
    '& .MuiInputBase-input-MuiOutlinedInput-input': {
        BoxShadow: '0 0 0 100px #000 inset',
    },

}));