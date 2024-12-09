import React from 'react';
import CompanyDetail from 'src/components/apps/company/detail/companyDetail';

import PageContainer from '../../../components/container/PageContainer';

const CompanyPost = () => {
  return (
    <PageContainer title="company" description="this is company page">
      {/* ------------------------------------------- */}
      {/* company Listing */}
      {/* ------------------------------------------- */}
      <CompanyDetail />
    </PageContainer>
  );
};

export default CompanyPost;
