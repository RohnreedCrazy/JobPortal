import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ListItemText,
  ListItemButton,
  List,
  Divider,
  FormGroup,
  ListItemIcon,
  FormControlLabel,
  Radio,
  Typography,
  Box,
  Button,
} from '@mui/material';
import {
  filterjobs,
  sortByjobs,
  sortByjobType,
  sortBysalary,
  filterReset,
} from '../../../../store/apps/FindJobs/FindJobsSlice';
import {
  IconCircles,
  IconSortAscending2,
  IconSortDescending2,
  IconAd2,
} from '@tabler/icons';
import { IconCodeCircle2 } from '@tabler/icons-react';
import { IconIcons } from '@tabler/icons-react';
import { IconBusinessplan } from '@tabler/icons-react';
import { IconBasketStar } from '@tabler/icons-react';

const JobsFilter = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.FindJobsReducer.jobs);
  const active = useSelector((state) => state.FindJobsReducer.filters);
  const checkactive = useSelector((state) => state.FindJobsReducer.sortBy);
  const customizer = useSelector((state) => state.customizer);
  const br = `${customizer.borderRadius}px`;

  const getUniqueData = (data, attr) => {

    if (!Array.isArray(data)) {
      console.error("Expected data to be an array but got:", typeof data);
      return []; // Return an empty array if the data isn't an array
    }
    
    let newVal = data.map((curElem) => {
      return curElem[attr];
    });
    if (attr === 'colors') {
      newVal = newVal.flat();
    }

    return (newVal = ['All', ...Array.from(new Set(newVal))]);
  };

  const filterbyjobType = getUniqueData(jobs, 'jobType');

  const filterCategory = [
    {
      id: 1,
      filterbyTitle: 'Filter by Category',
    },
    {
      id: 2,
      name: 'All',
      sort: 'All',
      icon: IconCircles,
    },
    {
      id: 3,
      name: 'Development',
      sort: 'Development',
      icon: IconCodeCircle2,
    },
    {
      id: 9,
      name: 'Design',
      sort: 'Design',
      icon: IconIcons,
    },
    {
      id: 10,
      name: 'Sales',
      sort: 'Sales',
      icon: IconBusinessplan,
    },
    {
      id: 11,
      name: 'Marketing',
      sort: 'Marketing',
      icon: IconBasketStar,
    },
    {
      id: 6,
      devider: true,
    },
  ];
  const filterbySort = [
    { id: 1, value: 'newest', label: 'Newest', icon: IconAd2 },
    { id: 2, value: 'salaryDesc', label: 'salary: High-Low', icon: IconSortAscending2 },
    { id: 3, value: 'salaryAsc', label: 'salary: Low-High', icon: IconSortDescending2 },
    { id: 4, value: 'discount', label: 'Discounted', icon: IconAd2 },
  ];
  const filterbysalary = [
    {
      id: 0,
      label: 'All',
      value: 'All',
    },
    {
      id: 1,
      label: '250-62500',
      value: '250-62500',
    },
    {
      id: 2,
      label: '62500-125000',
      value: '62500-125000',
    },
    {
      id: 3,
      label: '125000-187500',
      value: '125000-187500',
    },
    {
      id: 4,
      label: '187500-250000',
      value: '187500-250000',
    },
  ];

  const handlerjobTypeFilter = (value) => {
    if (value.target.checked) {
      dispatch(sortByjobType({ jobType: value.target.value }));
    }
  };
  const handlersalaryFilter = (value) => {
    if (value.target.checked) {
      dispatch(sortBysalary({ salary: value.target.value }));
    }
  };

  return (
    <>
      <List>
        {/* ------------------------------------------- */}
        {/* Category filter */}
        {/* ------------------------------------------- */}
        {filterCategory.map((filter) => {
          if (filter.filterbyTitle) {
            return (
              <Typography variant="subtitle2" fontWeight={600} px={3} mt={2} pb={2} key={filter.id}>
                {filter.filterbyTitle}
              </Typography>
            );
          } else if (filter.devider) {
            return <Divider key={filter.id} />;
          }

          return (
            <ListItemButton
              sx={{ mb: 1, mx: 3, borderRadius: br }}
              selected={active.category === `${filter.sort}`}
              onClick={() => dispatch(filterjobs({ category: `${filter.sort}` }))}
              key={filter.id}
            >
              <ListItemIcon sx={{ minWidth: '30px' }}>
                <filter.icon stroke="1.5" size="19" />
              </ListItemIcon>
              <ListItemText>{filter.name}</ListItemText>
            </ListItemButton>
          );
        })}
        {/* ------------------------------------------- */}
        {/* Sort by */}
        {/* ------------------------------------------- */}
        <Typography variant="subtitle2" fontWeight={600} px={3} mt={3} pb={2}>
          Sort By
        </Typography>
        {filterbySort.map((filter) => {
          return (
            <ListItemButton
              sx={{ mb: 1, mx: 3, borderRadius: br }}
              selected={checkactive === `${filter.value}`}
              onClick={() => dispatch(sortByjobs(`${filter.value}`))}
              key={filter.id + filter.label + filter.value}
            >
              <ListItemIcon sx={{ minWidth: '30px' }}>
                <filter.icon stroke="1.5" size={19} />
              </ListItemIcon>
              <ListItemText>{filter.label}</ListItemText>
            </ListItemButton>
          );
        })}
        <Divider></Divider>
        {/* ------------------------------------------- */}
        {/* Filter By JobType */}
        {/* ------------------------------------------- */}
        <Box p={3}>
          <Typography variant="subtitle2" fontWeight={600}>
            By JobType
          </Typography>
          <br />
          <FormGroup>
            {filterbyjobType.map((gen, index) => (
              <FormControlLabel
                key={index}  // Use the index or gen if it's guaranteed to be unique
                control={
                  <Radio
                    value={gen}
                    checked={active.jobType === gen}
                    onChange={handlerjobTypeFilter}
                  />
                }
                label={gen}
              />
            ))}
          </FormGroup>
        </Box>
        <Divider></Divider>
        {/* ------------------------------------------- */}
        {/* Filter By Salary */}
        {/* ------------------------------------------- */}
        <Typography variant="h6" px={3} mt={3} pb={2}>
          {`By Salary/Monthly($)`}
        </Typography>
        <Box p={3} pt={0}>
          <FormGroup>
            {filterbysalary.map((salary) => (
              <FormControlLabel
                key={salary.label}  // Use salary.label as the unique key
                control={
                  <Radio
                    value={salary.value}
                    checked={active.salary === salary.value}
                    onChange={handlersalaryFilter}
                  />
                }
                label={salary.label}
              />
            ))}
          </FormGroup>
        </Box>
        <Divider></Divider>
        {/* ------------------------------------------- */}
        {/* Reset */}
        {/* ------------------------------------------- */}
        <Box p={3}>
          <Button variant="contained" onClick={() => dispatch(filterReset())} fullWidth>
            Reset Filters
          </Button>
        </Box>
      </List>
    </>
  );
};

export default JobsFilter;
