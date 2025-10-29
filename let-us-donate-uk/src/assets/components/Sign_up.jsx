<<<<<<< HEAD
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/sign_up_login.css";
import "../../css/mobile.css";

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
      setMessage("❌ Passwords do not match");
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
        alert("✅ " + data.message);
        navigate(data.redirect || "/donor-dashboard");
      } else {
        setMessage("❌ " + data.message);
      }
    } catch (err) {
      setMessage("⚠️ Error connecting to server");
    }
  };
=======
import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/sign_up_login.css';
>>>>>>> 1c2712c36529439814554c6d899e071175b5025a

  return (
<<<<<<< HEAD
    <div className="middle">
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
=======
    <div>
      <div class="middle">
         <div className="return_home">
                 <a><Link to="/"> Return</Link></a> 
                </div>
        
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
>>>>>>> 1c2712c36529439814554c6d899e071175b5025a
    </div>
  );
}

export default DonorSignUp;
