import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div>
      <h2>Login page</h2>
      <Link to="/" className="home_btn">
        Back to Home
      </Link>
    </div>
  );
}

export default Login;
