import React, { useEffect } from 'react';
import { Grid, Pagination } from '@mui/material';
import CompanyCard from './companyCard';
import { orderBy } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { fetchcompanyPosts } from 'src/store/apps/company/companySlice';
import CompanyFeaturedCard from './companyFeaturedCard';

const CompanyListing = () => {
  const dispatch = useDispatch();

  // Fetch company posts when the component mounts
  useEffect(() => {
    dispatch(fetchcompanyPosts());
  }, [dispatch]);

  // Function to filter and sort non-featured companies based on selected criteria
  const filtercompanys = (posts, sortBy, cSearch) => {
    // Sort posts by creation date or popularity
    if (sortBy === 'newest') {
      posts = orderBy(posts, ['createdAt'], ['desc']); // Sort by newest first
    }
    if (sortBy === 'oldest') {
      posts = orderBy(posts, ['createdAt'], ['asc']); // Sort by oldest first
    }
    if (sortBy === 'popular') {
      posts = orderBy(posts, ['view'], ['desc']); // Sort by popularity (views)
    }

    // Filter non-featured posts
    if (posts) {
      return (posts = posts.filter((t) => t.featured === false));
    }

    return posts; // Return posts as is if no filtering is needed
  };

  // Function to filter only featured companies
  const filterFeaturedpost = (posts) => {
    return (posts = posts.filter((t) => t.featured)); // Return only featured posts
  };



  // Select and filter non-featured company posts from the Redux store
  const companyPosts = useSelector((state) =>
    filtercompanys(
      state.companyReducer.companyposts,
      state.companyReducer.sortBy,
      state.companyReducer.companySearch,
    ),
  );
  // Select jobs from Redux store and filter by jobId
  const companies = useSelector((state) => state.companyReducer.companyposts);

  // Select and filter featured company posts from the Redux store
  const featuredPost = useSelector((state) => filterFeaturedpost(state.companyReducer.companyposts));

  return (
    <Grid container spacing={3}>
      {/* Render featured company posts */}
      {featuredPost.map((post, index) => {
        return <CompanyFeaturedCard index={index} post={post} key={post.companyName} />;
      })}

      {/* Render non-featured company posts */}
      {companies.map((post) => {
        return <CompanyCard post={post} key={post._id} />;
      })}

      {/* Pagination for navigating company posts */}
      <Grid item lg={12} sm={12} mt={3}>
        <Pagination count={10} color="primary" sx={{ display: 'flex', justifyContent: 'center' }} />
      </Grid>
    </Grid>
  );
};

export default CompanyListing;
