import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './assets/components/Footer.jsx';
import Header from './assets/components/Header.jsx';
import Home from './assets/components/Home.jsx';
import Sign_up from './assets/components/Sign_up.jsx';
import Login from './assets/components/Login.jsx';
import FAQ from './assets/components/FAQ.jsx';
import Our_Partners from './assets/components/Our_Partners.jsx';

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
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
