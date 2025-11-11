import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/header.css';
import '../../css/mobile.css';

export default function Header_Alt({ onLogout }) {
  return (
    <header className="header">
      <div className="navbar">
        <div className="logo">
          <h1>
            <a href="#home">LetUsDonate.uk </a>
            <i className="fa-solid fa-leaf"></i>
          </h1>
          <div className="header_content">
            <h2>Donating Clothes the easy way</h2>
            <h3>
              We connect with donors to make clothing donation <br /> more
              efficient, transparent and impactful.
            </h3>
          </div>
        </div>
      </div>
    </header>
  );
}
