import React from 'react';
import { Box } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
// Custom components
import CustomTextField from "../../theme-elements/CustomTextField";
import countryData from "./countrydata";

// Helper function to add flag emojis
// const countryToFlag = (isoCode) =>
//   typeof String.fromCodePoint !== 'undefined'
//     ? isoCode
//         .toUpperCase()
//         .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
//     : isoCode;

const CountrySelectAutocomplete = ({ value, onChange, error, helperText }) => {
  return (
    <Autocomplete
      options={countryData}
      getOptionLabel={(option) => option?.label || ""}
      value={value || null}
      onChange={(event, newValue) => onChange(event, newValue)}
      isOptionEqualToValue={(option, value) => option?.code === value?.code}
      renderInput={(params) => (
        <CustomTextField
          {...params}
          label="Country"
          error={!!error}
          helperText={helperText}
        />
      )}
    />
  );
};

export default CountrySelectAutocomplete;
