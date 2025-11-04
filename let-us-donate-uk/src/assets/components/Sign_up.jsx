import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/sign_up_login.css";

function DonorSignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/signup.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === "success") {
        alert(data.message);
        navigate(data.redirect || "/user_dashboard");
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage("⚠️ Error connecting to server");
    }
  };

  return (
    <div className="middle">
      <div className="return_home">
        <Link to="/">Return</Link>
      </div>

      <h2>Create Donor Account</h2>
      <p>Sign up to start donating</p>

      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-box">
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
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
        </div>

        <div className="input-box">
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-box">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-box">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {message && <p style={{ color: "red" }}>{message}</p>}

        <Link className="print" to="/login">
          Already have an account?
        </Link>

        <div className="sub-btn">
          <button type="submit" className="btn">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default DonorSignUp;