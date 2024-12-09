import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
// custom
import CustomTextField from '../../theme-elements/CustomTextField';
// Top 100 films as rated by IMDb users.
import top100Films from './data';

const MultipleValuesAutocomplete = ({ value, onChange, error, helperText }) => (
  <Autocomplete
    multiple
    fullWidth
    id="tags-outlined"
    options={top100Films}
    getOptionLabel={(option) => option.title}
    value={value}
    onChange={onChange}
    filterSelectedOptions
    renderInput={(params) => (
      <CustomTextField
        {...params}
        placeholder="Your main skills"
        aria-label="Your main skills"
        error={error}
        helperText={helperText}
      />
    )}
  />
);

export default MultipleValuesAutocomplete;
