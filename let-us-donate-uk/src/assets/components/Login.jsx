import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/sign_up_login.css';

function Login() {
  return (
    <div>
      <div class="middle">
        <h2>Welcome Back</h2>
        <br></br>
        <p> Sign in to your account</p>

        <form action="" method="post">
          <div class="input-box">
            <input type="Email" name="email" placeholder="Email" required />
            <ii class="fa-solid fa-envelope"></ii>
          </div>

          <div class="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
            <ii class="fa-solid fa-lock"></ii>
          </div>
          <Link class="print" to="/Sign_Up">
            Don't have an account?
          </Link>

          <div class="sub-btn">
            <button type="Submit" class="btn" name="signUp">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
