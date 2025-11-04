import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { useEffect } from 'react';

import Footer from './assets/components/Footer.jsx';
import Header from './assets/components/Header.jsx';
import Header_Alt from './assets/components/Header_Alt.jsx';

import Home from './assets/components/Home.jsx';
import Sign_up from './assets/components/Sign_up.jsx';
import Login from './assets/components/Login.jsx';
import FAQ from './assets/components/FAQ.jsx';
import Our_Partners from './assets/components/Our_Partners.jsx';

import Charity_Dashboard from './assets/components/Charity/Charity_Dashboard.jsx';
import { View_Inventory } from './assets/components/Charity/View_Inventory.jsx';
import View_Donations from './assets/components/Charity/view_donations.jsx';
import Distribution_Records from './assets/components/Charity/Distribution_Records.jsx';
import Approve_Donations from './assets/components/Charity/approve_donations.jsx';

import Admin_Dashboard from './assets/components/Admin/admin_dashboard.jsx';
import View_Users from './assets/components/Admin/view_users.jsx';
import Data_Reports from './assets/components/Admin/Data_Reports.jsx';

import User_Dashboard from './assets/components/User/User_Dashboard.jsx';
import My_Impact from './assets/components/User/my_impact.jsx';
import My_Donations from './assets/components/User/my_donations.jsx';

import Terms_Conditions from './assets/components/Footer_Content/Terms_Conditions.jsx';
import Privacy_Policy from './assets/components/Footer_Content/Privacy_Policy.jsx';
import Accessibility from './assets/components/Footer_Content/Accessibility.jsx';
import Cookie_Policy from './assets/components/Footer_Content/Cookie_Policy.jsx';

function Layout() {
  const location = useLocation();
  const path = location.pathname.toLowerCase();

  const noHeaderFooterPaths = ['/login', '/sign_up'];
  const altHeaderPaths = [
    '/user_dashboard',
    '/my_donations',
    '/my_impact',
    '/charity_dashboard',
    '/view_inventory',
    '/view_donations',
    '/distribution_records',
    '/approve_donations',
    '/admin_dashboard',
    '/view_users',
    '/data_reports',
  ];

  const showNothing = noHeaderFooterPaths.includes(path);
  const showAltHeader = altHeaderPaths.includes(path);

  useEffect(() => {
    console.log('Current path:', path);
  }, [path]);

  return (
    <>
      {!showNothing && (showAltHeader ? <Header_Alt /> : <Header />)}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign_up" element={<Sign_up />} />
        <Route path="/login" element={<Login />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/our_partners" element={<Our_Partners />} />

        <Route path="/charity_dashboard" element={<Charity_Dashboard />} />
        <Route path="/view_inventory" element={<View_Inventory />} />
        <Route path="/view_donations" element={<View_Donations />} />
        <Route
          path="/distribution_records"
          element={<Distribution_Records />}
        />
        <Route path="/approve_donations" element={<Approve_Donations />} />

        <Route path="/admin_dashboard" element={<Admin_Dashboard />} />
        <Route path="/view_users" element={<View_Users />} />
        <Route path="/data_reports" element={<Data_Reports />} />

        <Route path="/user_dashboard" element={<User_Dashboard />} />
        <Route path="/my_impact" element={<My_Impact />} />
        <Route path="/my_donations" element={<My_Donations />} />

        <Route path="/terms_conditions" element={<Terms_Conditions />} />
        <Route path="/privacy_policy" element={<Privacy_Policy />} />
        <Route path="/accessibility" element={<Accessibility />} />
        <Route path="/cookie_policy" element={<Cookie_Policy />} />
      </Routes>

      {!showNothing && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
