import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './assets/components/Footer.jsx';
import Header from './assets/components/Header.jsx';
import Home from './assets/components/Home.jsx';
import Sign_up from './assets/components/Sign_up.jsx';
import Login from './assets/components/Login.jsx';
import FAQ from './assets/components/FAQ.jsx';
import Our_Partners from './assets/components/Our_Partners.jsx';

import Charity_Dashboard from './assets/components/Charity/charity_dashboard.jsx';
import View_Inventory from './assets/components/Charity/view_inventory.jsx';
import View_Donations from './assets/components/Charity/view_donations.jsx';
import Distribution_Records from './assets/components/Charity/view_donations.jsx';
import Approve_Donations from './assets/components/Charity/approve_donations.jsx';

import Admin_Dashboard from './assets/components/Admin/admin_dashboard.jsx';
import View_Users from './assets/components/Admin/view_users.jsx';

import User_Dashboard from './assets/components/User/User_Dashboard.jsx';
import My_Impact from './assets/components/User/my_impact.jsx';
import My_Donations from './assets/components/User/my_donations.jsx';




function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign_up" element={<Sign_up />} />
        <Route path="/login" element={<Login />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/our_partners" element={<Our_Partners />} />
        <Route path="/charity_dashboard" element={<Charity_Dashboard />} />
        <Route path="/admin_dashboard" element={<Admin_Dashboard />} />
        <Route path="/user_dashboard" element={<User_Dashboard />} />
        <Route path="/view_inventory" element={<View_Inventory />} />
        <Route path="/view_donations" element={<View_Donations />} />
        <Route path="/distribution_records" element={<Distribution_Records />} />
        <Route path="/approve_donations" element={<Approve_Donations />} />
        <Route path="/view_users" element={<View_Users />} />
        <Route path="/my_impact" element={<My_Impact />} />
        <Route path="/my_donations" element={<My_Donations />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
