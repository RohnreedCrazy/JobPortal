// material
import { TextField, InputAdornment } from '@mui/material';
import { IconSearch } from '@tabler/icons';

// redux
import { useDispatch } from 'react-redux';
import { Searchjob } from 'src/store/apps/FindJobs/FindJobsSlice';

// ----------------------------------------------------------------------
export default function JobSearch() {
  const dispatch = useDispatch();

  return (
    <>
      {/* ------------------------------------------- */}
      {/* Sort Button */}
      {/* ------------------------------------------- */}
      <TextField
        id="outlined-search"
        placeholder="Search Jobs"
        size="small"
        type="search"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconSearch size="14" />
            </InputAdornment>
          ),
        }}
        fullWidth
        onChange={(e) => dispatch(Searchjob(e.target.value))}
      />
    </>
  );
}
