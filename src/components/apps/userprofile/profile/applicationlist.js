import React, { useState } from 'react';
import { Button, Box, Drawer, useMediaQuery } from '@mui/material';
import Breadcrumb from '../../../../layouts/full/shared/breadcrumb/Breadcrumb';
import ApplicationList from '../../../../components/apps/FindJobs/jobApplication/ApplicationList';
import ApplicationContent from '../../../../components/apps/FindJobs/jobApplication/ApplicationContent';
import PageContainer from '../../../../components/container/PageContainer';
import AppCard from 'src/components/shared/AppCard';
import breadcrumbImg from 'src/assets/images/breadcrumb/emailSv.png';
 
const drawerWidth = 240;
const secdrawerWidth = 320;

const Application = () => {
  const [isRightSidebarOpen, setRightSidebarOpen] = useState(false);
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  return (
    <PageContainer title="Application App" description="this is email page">
      <Breadcrumb title="My Jobs & Applications" subtitle="Look at Application">
        <Box>
          <img src={breadcrumbImg} alt={breadcrumbImg} width={'165px'} />
        </Box>
      </Breadcrumb>

      <AppCard>

        {/* ------------------------------------------- */}
        {/* left part */}
        {/* ------------------------------------------- */}

        <Box
          sx={{
            minWidth: secdrawerWidth,
            width: { xs: '100%', md: secdrawerWidth, lg: secdrawerWidth },
            flexShrink: 0,
          }}
        >
          <ApplicationList showrightSidebar={() => setRightSidebarOpen(true)} />
        </Box>

        {/* ------------------------------------------- */}
        {/* Right part */}
        {/* ------------------------------------------- */}

        {mdUp ? (
          <Drawer
            anchor="right"
            variant="permanent"
            sx={{
              zIndex: 0,
              width: '200px',
              flex: '1 1 auto',
              [`& .MuiDrawer-paper`]: { position: 'relative' },
            }}
          >
            <Box>
              <ApplicationContent />
            </Box>
          </Drawer>
        ) : (
          <Drawer
            anchor="right"
            open={isRightSidebarOpen}
            onClose={() => setRightSidebarOpen(false)}
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { width: '85%' },
            }}
            variant="temporary"
          >
            <Box>
              <Box pl={3} pt={3}>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => setRightSidebarOpen(false)}
                  sx={{ display: { xs: 'block', md: 'none', lg: 'none' } }}
                >
                  {' '}
                  Back{' '}
                </Button>
              </Box>
              <ApplicationContent />
            </Box>
          </Drawer>
        )}
      </AppCard>
    </PageContainer>
  );
};

export default Application;
