import React, { useEffect } from 'react';
import { Grid, Pagination } from '@mui/material';
import CompanyCard from './companyCard';
import { orderBy } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { fetchcompanyPosts } from 'src/store/apps/company/companySlice';
import CompanyFeaturedCard from './companyFeaturedCard';

const CompanyListing = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchcompanyPosts());
  }, [dispatch]);

  const filtercompanys = (posts, sortBy, cSearch) => {
    // SORT BY

    if (sortBy === 'newest') {
      posts = orderBy(posts, ['createdAt'], ['desc']);
    }
    if (sortBy === 'oldest') {
      posts = orderBy(posts, ['createdAt'], ['asc']);
    }
    if (sortBy === 'popular') {
      posts = orderBy(posts, ['view'], ['desc']);
    }
    if (posts) {
      return (posts = posts.filter((t) => t.featured === false));
    }
    return posts;
  };
  const filterFeaturedpost = (posts) => {
    return (posts = posts.filter((t) => t.featured));
  };
  const companyPosts = useSelector((state) =>
    filtercompanys(
      state.companyReducer.companyposts,
      state.companyReducer.sortBy,
      state.companyReducer.companySearch,
    ),
  );
  const featuredPost = useSelector((state) => filterFeaturedpost(state.companyReducer.companyposts));

  return (
    <Grid container spacing={3}>
      {featuredPost.map((post, index) => {
        return <CompanyFeaturedCard index={index} post={post} key={post.title} />;
      })}
      {companyPosts.map((post) => {
        return <CompanyCard post={post} key={post.id} />;
      })}
      <Grid item lg={12} sm={12} mt={3}>
        <Pagination count={10} color="primary" sx={{ display: 'flex', justifyContent: 'center' }} />
      </Grid>
    </Grid>
  );
};

export default CompanyListing;
