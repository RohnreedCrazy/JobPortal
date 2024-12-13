import React from 'react';

import {
  ListItemText,
  ListItemIcon,
  Chip,
  ListItemButton,
  Typography,
  Stack,
  useTheme,
  Box,
} from '@mui/material';
import CustomCheckbox from 'src/components/forms/theme-elements/CustomCheckbox';
import { IconAlertCircle, IconStar, IconTrash } from '@tabler/icons';
import { formatDistanceToNowStrict } from 'date-fns';

const ApplicationListItem = ({
  _id,
  onClick,
  onChange,
  onStar,
  onImportant,
  name,
  jobTitle,
  statue,
  appliedAt,
  checked,
  starred,
  onDelete,
  important,
  isSelected,
}) => {
  const theme = useTheme();

  const warningColor = theme.palette.warning.main;
  const errorColor = theme.palette.error.light;

  return (
    <ListItemButton sx={{ mb: 1, py: 2 }} selected={isSelected} alignItems="flex-start">
      <Box>
        <ListItemIcon sx={{ minWidth: '35px', mt: '0' }}>
          <CustomCheckbox edge="start" id={`check${_id}`} tabIndex={-1} onChange={onChange} />
        </ListItemIcon>
      </Box>
      {/* ------------------------------------------- */}
      {/* Application page */}
      {/* ------------------------------------------- */}
      <ListItemText onClick={onClick}>
        <Stack direction="row" gap="10px" alignItems="center">
          <Typography variant="subtitle2" mb={0.5} fontWeight={600} mr={'auto'}>
            {name}
          </Typography>
          <Chip
            label={statue}
            size="small"
            color={
              statue === 'Pending'
                ? 'primary'
                : statue === 'Accepted'
                ? 'success'
                : statue === 'Rejected'
                ? 'error'
                : 'default'
            }
          />
        </Stack>
        <Typography variant="subtitle2" noWrap width={'80%'} color="text.secondary">
          {jobTitle}
        </Typography>
        {/* ------------------------------------------- */}
        {/* Application page */}
        {/* ------------------------------------------- */}
        <Stack direction="row" mt={1} gap="10px" alignItems="center">
          <IconStar
            onClick={onStar}
            stroke={1}
            size="18"
            style={{ fill: starred ? warningColor : '', stroke: starred ? warningColor : '' }}
          />
          <IconAlertCircle
            onClick={onImportant}
            size="18"
            stroke={1.2}
            style={{ fill: important ? errorColor : '' }}
          />
          {/* ------------------------------------------- */}
          {/* Checked ? */}
          {/* ------------------------------------------- */}
          {checked ? <IconTrash onClick={onDelete} stroke={1.5} size="16" /> : ''}
          <Typography variant="caption" noWrap sx={{ ml: 'auto' }}>
            {appliedAt && !isNaN(Date.parse(appliedAt))
              ? formatDistanceToNowStrict(new Date(appliedAt), { addSuffix: false }) + ' ago'
              : 'Invalid date'}
          </Typography>
        </Stack>
      </ListItemText>
    </ListItemButton>
  );
};

export default ApplicationListItem;
