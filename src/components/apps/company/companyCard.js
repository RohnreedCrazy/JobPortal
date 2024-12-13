import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// third-party
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  CardContent,
  Stack,
  Avatar,
  Typography,
  CardMedia,
  Chip,
  Grid,
  Tooltip,
  Box,
  Skeleton,
} from '@mui/material';
import { IconEye, IconMessage2, IconPoint } from '@tabler/icons';
import { fetchcompanyPost } from 'src/store/apps/company/companySlice';

import BlankCard from '../../shared/BlankCard';

const CompanyCard = ({ post }) => {
  const dispatch = useDispatch();

  const {
    _id,
    companyCover,
    companyName,
    companySize,
    contactNumber,
    category,
    companyLogo,
    createdAt } = post;

  const linkTo = _id
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');

  const [isLoading, setLoading] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Grid item xs={12} lg={4} md={4} sm={6} display="flex" alignItems="stretch">
      {isLoading ? (
        <>
          <Skeleton
            animation="wave"
            variant="square"
            width="100%"
            height={400}
            sx={{ borderRadius: (theme) => theme.shape.borderRadius / 5 }}
          ></Skeleton>
        </>
      ) : (
        <BlankCard className="hoverCard">
          <Typography
            component={Link}
            to={`/apps/company/detail/${linkTo}`}
            // onClick={() => dispatch(fetchcompanyPost(linkTo))}
          >
            <CardMedia component="img" height="240" src={companyCover} alt="green iguana" />
          </Typography>
          <CardContent>
            <Stack direction="row" sx={{ marginTop: '-100px' }}>
              <Tooltip title={companyName} placement="top">
                <Avatar
                  aria-label="recipe"
                  src={companyLogo}
                  sx={{
                    width: 100, // Specify the width
                    height: 100, // Specify the height
                  }}
                />
              </Tooltip>
              <Chip
                sx={{ marginLeft: 'auto', marginTop: '65px', backgroundColor: 'white' }}
                label={contactNumber}
                size="small"
              />
            </Stack>
            <Chip label={category} size="small" sx={{ marginTop: 2 }}></Chip>
            <Box my={3}>
              <Typography
                gutterBottom
                variant="h5"
                color="inherit"
                sx={{ textDecoration: 'none' }}
                component={Link}
                to={`/apps/company/detail/${linkTo}`}
                // onClick={() => dispatch(fetchcompanyPost(linkTo))}
              >
                {companyName}
              </Typography>
            </Box>
            <Stack direction="row" gap={3} alignItems="center">
              <Stack direction="row" gap={1} alignItems="center">
                <IconEye size="18" /> {companySize}
              </Stack>
              <Stack direction="row" gap={1} alignItems="center">
                <IconMessage2 size="18" /> 555
              </Stack>

              <Stack direction="row" ml="auto" alignItems="center">
                <IconPoint size="16" />
                {/* <small>{format(new Date(createdAt), 'E, MMM d')}</small> */}
              </Stack>
            </Stack>
          </CardContent>
        </BlankCard>
      )}
    </Grid>
  );
};
CompanyCard.propTypes = {
  post: PropTypes.object.isRequired,
};
export default CompanyCard;
