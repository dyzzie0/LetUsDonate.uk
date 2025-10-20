import React from 'react';
import { Link } from 'react-router-dom';

function FAQ() {
  return (
    <div>
      <h2>FAQ Page</h2>
      <Link to="/" className="home_btn">
        Back to Home
      </Link>
    </div>
  );
}

export default FAQ;
