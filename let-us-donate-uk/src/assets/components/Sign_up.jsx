import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/sign_up_login.css';

function DonorSignUp() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/signup.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === 'success') {
        alert(data.message);
        navigate(data.redirect || '/donor-dashboard');
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage('Could not connect you to server');
    }
  };

  return (
    <div>
      <div className="middle">
        <div className="return_home">
          <Link to="/">Return</Link>
        </div>

        <h2>Create Account</h2>
        <br></br>
        <p>Quickly Create An Account</p>

        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <ii class="fa-solid fa-user"></ii>
          </div>

          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <ii class="fa-solid fa-envelope"></ii>
          </div>

          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password* (6 characters)"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <ii class="fa-solid fa-key"></ii>
          </div>

          <div className="input-box">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password* (6 characters)"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <ii class="fa-solid fa-lock"></ii>
          </div>

          {message && <p style={{ color: 'red' }}>{message}</p>}

          <div className="signup_link">
            <Link className="print" to="/login">
              Already have an account?
            </Link>
          </div>

          <div className="sub-btn">
            <button type="submit" className="btn">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DonorSignUp;
