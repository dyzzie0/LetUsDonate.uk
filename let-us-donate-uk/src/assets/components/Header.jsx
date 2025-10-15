import React, { useState } from 'react';
import '../../css/header.css';


function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

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
          We connect with donors to make clothing donation <br /> more efficient,
          transparent and impactful.
        </h3>
      </div>
    </div>

    <div className="nav_right">
      <div className="how">
        <a href="#how">How does this work?</a>
      </div>
      <div className="menu_text" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? "Close ✕" : "Menu"}
      </div>
    </div>
  </div>

  <div className={`DropdownMenu ${menuOpen ? 'open' : ''}`}>
    <button className="close_btn" onClick={() => setMenuOpen(false)}>✕</button>
    <ul className="dropdown_links">
      <li><a href="#home">Home</a></li>
      <li><a href="#ourpartners">Our Partners</a></li>
      <li><a href="#fqa">FAQ</a></li>
      <li><a href="#joinus">Join Us</a></li>
      <li className="co2">
        <p>Thanks to your donations this much CO₂ has been saved!</p>
        <div className="co2_value">0 CO₂e</div>
      </li>
    </ul>
  </div>
</header>

  );
}

export default Header