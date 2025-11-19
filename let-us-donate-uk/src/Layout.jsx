import { Routes, Route, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


// Components
import Header from './assets/components/Header.jsx';
import Header_Alt from './assets/components/Header_Alt.jsx';
import Footer from './assets/components/Footer.jsx';
import NotFound from './404.jsx';

export default function Layout() {
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
    '/my_profile',
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
        <Route path="/distribution_records" element={<Distribution_Records />} />
        <Route path="/approve_donations" element={<Approve_Donations />} />

        <Route path="/add_charity" element={<Add_Charity />} />
        <Route path="/admin_dashboard" element={<Admin_Dashboard />} />
        <Route path="/view_users" element={<View_Users />} />
        <Route path="/data_reports" element={<Data_Reports />} />

        <Route path="/user_dashboard" element={<User_Dashboard />} />
        <Route path="/my_impact" element={<My_Impact />} />
        <Route path="/my_donations" element={<My_Donations />} />
        <Route path="/my_profile" element={<My_Profile />} />

        <Route path="/terms_conditions" element={<Terms_Conditions />} />
        <Route path="/privacy_policy" element={<Privacy_Policy />} />
        <Route path="/accessibility" element={<Accessibility />} />
        <Route path="/cookie_policy" element={<Cookie_Policy />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {!showNothing && <Footer />}
    </>
  );
}
