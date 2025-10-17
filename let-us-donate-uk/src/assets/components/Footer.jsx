import React, { useState } from 'react';
import '../../css/footer.css';
import '../../css/mobile.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          <a href="#">Terms and conditions</a> / <a href="#">Accessibility</a> /{' '}
          <a href="#">Cookie policy</a> / <a href="#">Privacy Policy</a> / ©
          Copyright <strong>2025</strong> / All Rights Reserved
        </p>
        <div className="footer-logo">
          <i class="fa-solid fa-leaf"></i>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
