import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../css/sign_up_login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8000/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('role', data.user.role);

        if (data.user.role === 'donor') navigate('/User_dashboard');
        else if (data.user.role === 'charity') navigate('/Charity_dashboard');
        else if (data.user.role === 'admin') navigate('/Admin_dashboard');
        else if (data.user.role === 'user') navigate('/User_dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Error connecting to server');
    }
  };

  return (
    <div>
      <div className="middle">
        <div className="return_home">
          <Link to="/">Return</Link>
        </div>

        <h2>Welcome Back</h2>
        <br />
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
            <ii className="fa-solid fa-envelope"></ii>
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <ii className="fa-solid fa-lock"></ii>
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <div className="signup_link">
            <Link to="/Sign_Up">Don't have an account?</Link>
          </div>

          <div className="sub-btn">
            <button type="submit" className="btn">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
