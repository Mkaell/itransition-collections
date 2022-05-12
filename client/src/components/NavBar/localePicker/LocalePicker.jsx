import React, { useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { FormattedMessage } from "react-intl";
import locales from "../../../utils/localizations/constant/locales"


export default function LocalePicker({ currentLocale, onLocaleChanged }) {
    const [locale, setLocale] = useState(currentLocale);

    const onChanged = (e) => {
        const { value } = e.target;
        setLocale(value);
        localStorage.setItem('app.localization', value);
        onLocaleChanged(value);
    }

    return (
        <Box>
            <FormControl variant="standard">
                <Select
                    labelId="demo-simple-select-standard-label"
                    value={locale}
                    onChange={onChanged}
                >
                    <MenuItem value={locales.EN}>EN</MenuItem>
                    <MenuItem value={locales.RU}>RU</MenuItem>
                    <MenuItem value={locales.PL}>PL</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}