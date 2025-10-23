import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/sign_up_login.css';

function Sign_up() {
  return (
    <div>
      <div class="middle">
        <h2>Create Account</h2>
        <br></br>
        <p>Quickly Create An Account</p>

        <form action="" method="post">
          <div class="input-box">
            <input
              type="text"
              name="full-name"
              placeholder="Full Name*"
              required
            />
            <ii class="fa-solid fa-user"></ii>
          </div>

          <div class="input-box">
            <input type="Email" name="email" placeholder="Email*" required />
            <ii class="fa-solid fa-envelope"></ii>
          </div>

          <div class="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password* (6 characters)"
              required
            />
            <ii class="fa-solid fa-key"></ii>
          </div>

          <div class="input-box">
            <input
              type="password"
              name="con-password"
              placeholder="Confirm Password* (6 characters)"
              required
            />
            <ii class="fa-solid fa-lock"></ii>
          </div>

          <Link class="print" to="/Login">
            <h3>Already have an account?</h3>
          </Link>

          <div class="sub-btn">
            <button type="Submit" class="btn" name="signUp">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Sign_up;
