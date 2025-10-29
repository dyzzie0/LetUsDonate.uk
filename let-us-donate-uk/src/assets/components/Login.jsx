<<<<<<< HEAD
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/sign_up_login.css';
import '../../css/mobile.css';
=======
import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/sign_up_login.css';
>>>>>>> 1c2712c36529439814554c6d899e071175b5025a

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError('');

    try {
      const response = await fetch('http://localhost:8000/login.php'
      , {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(data.user));

        if (data.user.role === 'donor') navigate('/User_dashboard');
        else if (data.user.role === 'charity') navigate('/Charity_dashboard');
        else if (data.user.role === 'admin') navigate('/Admin_dashboard');

      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Error connecting to server');
    }
  };

  return (
<<<<<<< HEAD
    <div className="middle">
      <h2>Welcome Back</h2>
      <p>Sign in to your account</p>

      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}


        
        <div className="sub-btn">
          <button type="submit" className="btn">
            Login
          </button>
        </div>
      </form>
=======
    <div>
      <div class="middle">
        <div className="return_home">
         <a><Link to="/"> Return</Link></a> 
        </div>

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
>>>>>>> 1c2712c36529439814554c6d899e071175b5025a
    </div>
  );
}

export default Login;
