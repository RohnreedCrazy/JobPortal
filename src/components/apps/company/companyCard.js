import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// third-party
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
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
import BlankCard from '../../shared/BlankCard';
import { IconMaximize } from '@tabler/icons-react';
import { IconPhone } from '@tabler/icons-react';
import { IconCalendar } from '@tabler/icons-react';

const CompanyCard = ({ post }) => {
  const {
    _id,
    companyCover,
    companyName,
    companySize,
    contactNumber,
    companyWebsite,
    companyLogo,
    createdAt,
  } = post;

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
            </Stack>
            <a href={companyWebsite}>
              <Chip label="Our site" size="small" sx={{ marginTop: 2 }} />
            </a>
            <Box my={3}>
              <Typography
                gutterBottom
                variant="h5"
                color="inherit"
                sx={{ textDecoration: 'none' }}
                component={Link}
                to={`/apps/company/detail/${linkTo}`}
              >
                {companyName}
              </Typography>
            </Box>
            <Stack direction="row" gap={3} alignItems="center">
              <Tooltip title="Company Size" placement="top">
                <Stack direction="row" gap={1} alignItems="center">
                  <IconMaximize size="20" /> {companySize}
                </Stack>
              </Tooltip>
              <Tooltip title="Contact Number" placement="top">
                <Stack direction="row" gap={1} alignItems="center">
                  <IconPhone size="20" /> {contactNumber}
                </Stack>
              </Tooltip>

              <Stack direction="row" ml="auto" alignItems="center">
                <IconCalendar size="20" />
                <small>{format(new Date(createdAt), 'E, MMM d') || `no date`}</small>
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
