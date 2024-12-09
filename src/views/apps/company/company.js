import React from 'react';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/CompanyHeader';
import PageContainer from '../../../components/container/PageContainer';
import CompanyListing from 'src/components/apps/company/companyListing';

const Company = () => {
  return (
    <PageContainer title="company" description="this is company page">
      <Breadcrumb title="Companies" subtitle="Discover great tech companies that are already hiring in our job board." />
      {/* ------------------------------------------- */}
      {/* company Listing */}
      {/* ------------------------------------------- */}
      <CompanyListing />
    </PageContainer>
  );
};

export default Company;
