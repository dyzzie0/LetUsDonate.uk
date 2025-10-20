import React from 'react';
import { Link } from 'react-router-dom';

function Sign_up() {
  return (
    <div>
      <h2>Sign Up Page</h2>
      <Link to="/" className="home_btn">
        Back to Home
      </Link>
    </div>
  );
}

export default Sign_up;
