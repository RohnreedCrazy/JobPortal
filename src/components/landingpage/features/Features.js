import React from 'react';
import FeaturesTitle from './FeaturesTitle';
import { Typography, Grid, Container, Box } from '@mui/material';
import {
  IconAdjustments,
  IconArchive,
  IconArrowsShuffle,
  IconBook,
  IconBuildingCarousel,
  IconCalendar,
  IconChartPie,
  IconDatabase,
  IconDiamond,
  IconLanguageKatakana,
  IconLayersIntersect,
  IconMessages,
  IconRefresh,
  IconShieldLock,
  IconTag,
  IconWand,
} from '@tabler/icons';
import { IconCreativeCommonsBy } from '@tabler/icons-react';
import AnimationFadeIn from '../animation/Animation';
import { IconBrandTether } from '@tabler/icons-react';
import { IconBasketCog } from '@tabler/icons-react';
import { IconFileDollar } from '@tabler/icons-react';
import { IconAccessible } from '@tabler/icons-react';
import { IconBrandAdobePhotoshop } from '@tabler/icons-react';
import { IconDatabaseImport } from '@tabler/icons-react';
import { IconShoppingCart } from '@tabler/icons-react';
import { IconGavel } from '@tabler/icons-react';
import { IconActivity } from '@tabler/icons-react';
import { IconMicroscopeOff } from '@tabler/icons-react';
import { IconHeartHandshake } from '@tabler/icons-react';
import { IconCodeCircle2 } from '@tabler/icons-react';
import { IconAutomation } from '@tabler/icons-react';
import { IconBrandAzure } from '@tabler/icons-react';
import { IconBubbleText } from '@tabler/icons-react';

const featuresData = [
  {
    icon: <IconCreativeCommonsBy width={40} height={40} strokeWidth={1.5} />,
    title: 'Executive Leadership',
    subtext: 'Leaders who guide organizations, set strategic direction, and make key decisions',
  },
  {
    icon: <IconBrandTether width={40} height={40} strokeWidth={1.5} />,
    title: 'Technology & Engineering',
    subtext: 'Professionals who design, build, and maintain software, hardware, and systems',
  },
  {
    icon: <IconBasketCog width={40} height={40} strokeWidth={1.5} />,
    title: 'Marketing & Advertising',
    subtext: 'Individuals responsible for promoting products or services and creating brand strategies ',
  },
  {
    icon: <IconFileDollar width={40} height={40} strokeWidth={1.5} />,
    title: 'Finance & Accounting',
    subtext: 'Roles focused on managing financial operations, budgets, and investments',
  },
  {
    icon: <IconAccessible width={40} height={40} strokeWidth={1.5} />,
    title: 'Human Resources & Talent Management',
    subtext: 'Experts who manage recruitment, employee development, and organizational culture',
  },
  {
    icon: <IconBrandAdobePhotoshop width={40} height={40} strokeWidth={1.5} />,
    title: 'Creative Arts & Design',
    subtext: 'Creative professionals responsible for visual design, media production, and artistic direction',
  },
  {
    icon: <IconDatabaseImport width={40} height={40} strokeWidth={1.5} />,
    title: 'Data Science & Analytics',
    subtext: 'Specialists who analyze large sets of data to derive actionable insights and inform business decisions',
  },
  {
    icon: <IconShoppingCart width={40} height={40} strokeWidth={1.5} />,
    title: 'Product Management',
    subtext: 'Professionals who oversee the development, launch, and optimization of products ',
  },
  {
    icon: <IconGavel width={40} height={40} strokeWidth={1.5} />,
    title: 'Legal & Compliance',
    subtext: 'Experts who manage legal affairs, ensure regulatory compliance, and protect the organization’s interests',
  },
  {
    icon: <IconActivity width={40} height={40} strokeWidth={1.5} />,
    title: 'Healthcare & Medicine',
    subtext: 'Roles in healthcare focused on patient care, medical research, and healthcare management ',
  },
  {
    icon: <IconMicroscopeOff width={40} height={40} strokeWidth={1.5} />,
    title: 'Education & Training',
    subtext: 'Professionals who develop curricula, teach students, and train employees for skill development',
  },
  {
    icon: <IconHeartHandshake width={40} height={40} strokeWidth={1.5} />,
    title: 'Customer Service & Support',
    subtext: 'Individuals who assist customers, resolve issues, and maintain positive relationships',
  },
  {
    icon: <IconCodeCircle2 width={40} height={40} strokeWidth={1.5} />,
    title: 'Sales & Business Development',
    subtext: 'Professionals focused on increasing sales, generating leads, and building customer relationships',
  },
  {
    icon: <IconAutomation width={40} height={40} strokeWidth={1.5} />,
    title: 'Operations & Supply Chain',
    subtext: 'Professionals who manage logistics, supply chain management, and day-to-day business operations',
  },
  {
    icon: <IconBrandAzure width={40} height={40} strokeWidth={1.5} />,
    title: 'Consulting & Strategy',
    subtext: 'Experts who advise organizations on improving efficiency, solving problems, and executing business strategies ',
  },
  {
    icon: <IconBubbleText width={40} height={40} strokeWidth={1.5} />,
    title: 'Public Relations & Communications',
    subtext: 'Professionals who manage public perception, media relations, and corporate communications',
  },
];

const Features = () => {
  return (
    <Box py={6}>
      <Container maxWidth="lg">
        <FeaturesTitle />

        <Box mt={6}>
          <Grid container spacing={3}>
            {featuresData.map((feature, index) => (
              <Grid item xs={12} sm={4} lg={3} textAlign="center" key={index}>
                <AnimationFadeIn>
                  <Box color="primary.main">{feature.icon}</Box>
                  <Typography variant="h5" mt={3}>
                    {feature.title}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary" mt={1} mb={3}>
                    {feature.subtext}
                  </Typography>
                </AnimationFadeIn>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Features;
