import React, { useEffect, useState } from 'react';
import { Grid, Pagination,Box,Typography,Button } from '@mui/material';
import { Link } from 'react-router-dom';
import CompanyCard from './companyCard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchcompanyPosts } from 'src/store/apps/company/companySlice';
import CompanyFeaturedCard from './companyFeaturedCard';
import emptyCart from 'src/assets/images/company/empty-company.jpg';

const CompanyListing = () => {
  const dispatch = useDispatch();

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  // Fetch company posts when the component mounts
  useEffect(() => {
    dispatch(fetchcompanyPosts());
  }, [dispatch]);

  // Function to filter only featured companies
  const filterFeaturedpost = (posts) => {
    return posts.filter((t) => t.featured); // Return only featured posts
  };

  // Select jobs from Redux store and filter by jobId
  const companies = useSelector((state) => state.companyReducer.companyposts);

  // Select and filter featured company posts from the Redux store
  const featuredPost = filterFeaturedpost(companies);

  // Pagination logic
  const totalPages = Math.ceil(companies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPosts = companies.slice(startIndex, startIndex + itemsPerPage);

  // Handle pagination change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      {featuredPost.length > 0 || currentPosts.length > 0 ? (
        <Grid container spacing={3}>
          {/* Render featured company posts */}
          {featuredPost.map((post, index) => (
            <CompanyFeaturedCard index={index} post={post} key={post.companyName} />
          ))}
  
          {/* Render paginated non-featured company posts */}
          {currentPosts.map((post) => (
            <CompanyCard post={post} key={post._id} />
          ))}
  
          {/* Pagination for navigating company posts */}
          <Grid item lg={12} sm={12} mt={3}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              sx={{ display: 'flex', justifyContent: 'center' }}
            />
          </Grid>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <Box textAlign="center" mt={6}>
            <img src={emptyCart} alt="cart" width="200px" />
            <Typography variant="h2">There is no Company</Typography>
            <Typography variant="h6" mb={3}>
              The Company you are searching is no longer available.
            </Typography>
            <Button variant="contained" component={Link} to={`/`}>
              Try Again
            </Button>
          </Box>
        </Grid>
      )}
    </>
  );
};

export default CompanyListing;
