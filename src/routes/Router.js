import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import Loadable from '../layouts/full/shared/loadable/Loadable';
import AuthGuard from 'src/guards/authGuard/AuthGuard';
import GuestGuard from 'src/guards/authGuard/GuestGaurd';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const ModernDash = Loadable(lazy(() => import('../views/dashboard/Modern')));
const FindJobsDash = Loadable(lazy(() => import('../views/dashboard/FindJobs')));

/* ****Apps***** */
const Chats = Loadable(lazy(() => import('../views/apps/chat/Chat')));
const Notes = Loadable(lazy(() => import('../views/apps/notes/Notes')));
const Calendar = Loadable(lazy(() => import('../views/apps/calendar/BigCalendar')));
const Email = Loadable(lazy(() => import('../views/apps/email/Email')));
const Company = Loadable(lazy(() => import('../views/apps/company/company')));
const FeaturedJobPost = Loadable(lazy(() => import('../views/apps/company/Jobpost')));
const FreeJobPost = Loadable(lazy(() => import('../components/apps/jobPost/freeJobPost')));
const JobApplication = Loadable(lazy(() => import('../views/apps/jobApplication/JobApplication')));
const CompanyDetail = Loadable(lazy(() => import('../views/apps/company/companyPost')));
const Tickets = Loadable(lazy(() => import('../views/apps/tickets/Tickets')));
const Contacts = Loadable(lazy(() => import('../views/apps/contacts/Contacts')));
const FindJobs = Loadable(lazy(() => import('../views/apps/FindJobs/FindJobs')));
const FindJobsDetail = Loadable(lazy(() => import('../views/apps/FindJobs/FindJobsDetail')));
const EcomjobList = Loadable(lazy(() => import('../views/apps/FindJobs/EcomjobList')));
const EcomjobCheckout = Loadable(
  lazy(() => import('../views/apps/FindJobs/FindJobsCheckout')),
);
const ApplicationTableList = Loadable(lazy(() => import('../components/apps/userprofile/profile/applicationTableList'))); 
const ApplicationList = Loadable(lazy(() => import('../components/apps/userprofile/profile/applicationlist'))); 

// Pages
const RollbaseCASL = Loadable(lazy(() => import('../views/pages/rollbaseCASL/RollbaseCASL')));
const Pricing = Loadable(lazy(() => import('../views/pages/pricing/Pricing')));
const AccountSetting = Loadable(
  lazy(() => import('../views/pages/account-setting/AccountSetting')),
);
const Faq = Loadable(lazy(() => import('../views/pages/faq/Faq')));

// widget
const WidgetCards = Loadable(lazy(() => import('../views/widgets/cards/WidgetCards')));
const WidgetBanners = Loadable(lazy(() => import('../views/widgets/banners/WidgetBanners')));
const WidgetCharts = Loadable(lazy(() => import('../views/widgets/charts/WidgetCharts')));

// authentication
const Login = Loadable(lazy(() => import('../views/authentication/auth1/Login')));
const Register = Loadable(lazy(() => import('../views/authentication/auth1/Register')));
const ForgotPassword = Loadable(lazy(() => import('../views/authentication/auth1/ForgotPassword')));
const TwoSteps = Loadable(lazy(() => import('../views/authentication/auth1/TwoSteps')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Maintenance = Loadable(lazy(() => import('../views/authentication/Maintenance')));

// landingpage
const Landingpage = Loadable(lazy(() => import('../views/pages/landingpage/Landingpage')));


const Router = [
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '', element: <Landingpage /> }, 
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/',
    element: (
      <AuthGuard>
        <FullLayout />
      </AuthGuard>
    ),
    children: [
      { path: '/', element: <Navigate to="/dashboards/modern" /> },
      { path: 'dashboards/modern', exact: true, element: <ModernDash /> },
      { path: 'dashboards/FindJobs', exact: true, element: <FindJobsDash /> },
      { path: 'apps/chats', element: <Chats /> },
      { path: 'apps/notes', element: <Notes /> },
      { path: 'apps/calendar', element: <Calendar /> },
      { path: 'apps/email', element: <Email /> },
      { path: 'apps/tickets', element: <Tickets /> },
      { path: 'apps/contacts', element: <Contacts /> },
      { path: 'apps/FindJobs/jobs', element: <FindJobs /> },
      { path: 'apps/company/companies', element: <Company /> },
      { path: 'apps/company/detail/:id', element: <CompanyDetail /> },
      { path: 'apps/freejobpost', element: <FreeJobPost /> },
      { path: 'apps/featuredjobpost', element: <FeaturedJobPost /> },
      { path: 'apps/jobApplication/:id', element: <JobApplication /> },
      { path: 'apps/FindJobs/job-list', element: <EcomjobList /> },
      { path: 'apps/FindJobs/checkout', element: <EcomjobCheckout /> },
      { path: 'apps/FindJobs/detail/:id', element: <FindJobsDetail /> },
      { path: 'user-profile/applicationTablelist', element: <ApplicationTableList /> },
      { path: 'user-profile/applicationlist', element: <ApplicationList /> },
      { path: 'pages/casl', element: <RollbaseCASL /> },
      { path: 'pages/pricing', element: <Pricing /> },
      { path: 'pages/account-settings', element: <AccountSetting /> },
      { path: 'pages/faq', element: <Faq /> },
      { path: 'widgets/cards', element: <WidgetCards /> },
      { path: 'widgets/banners', element: <WidgetBanners /> },
      { path: 'widgets/charts', element: <WidgetCharts /> },
      { path: '*', element: <Navigate to="404" /> },
    ],
  },
  {
    path: '/auth',
    element: (
      <GuestGuard>
        <BlankLayout />
      </GuestGuard>
    ),
    children: [
      { path: '404', element: <Error /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'two-steps', element: <TwoSteps /> },
      { path: 'maintenance', element: <Maintenance /> },
    ],
  },
];

export default Router;
