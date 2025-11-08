import React, { useState, useEffect } from 'react';
import '../../../css/user_charity.css';
import '../../../css/user.css';

export function User_Dashboard() {
  const [status, setStatus] = useState(null);
  const [donations, setDonations] = useState([]);
  const [charities, setCharities] = useState([]);
  const [loadingCharities, setLoadingCharities] = useState(true);
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);

  // Load user from localStorage
  // Load user from localStorage
  useEffect(() => {
    let storedUser = null;
    try {
      const item = localStorage.getItem("user");
      if (item) storedUser = JSON.parse(item);
    } catch {
      storedUser = null;
    }
    setUser(storedUser);
  }, []);

  // Handle file upload
  function handleChange(e) {
    if (e.target.files?.[0]) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  }

  function handleDeleteFile() {
    setFile(null);
  }


  // Fetch user donations
  useEffect(() => {
    if (user?.id) {
      fetch(`http://localhost:8000/get_donations.php?user_id=${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") setDonations(data.donations);
          else console.error("Error loading donations:", data.message);
        })
        .catch(() => console.error('Failed to load donations'));
    }
  }, [user]);

  // Fetch charities
  useEffect(() => {
    setLoadingCharities(true);
    fetch('http://localhost:8000/get_charities.php')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") setCharities(data.charities);
        else console.error("Error loading charities:", data.message);
        setLoadingCharities(false);
      })
      .catch((err) => {
        console.error('Failed to load charities', err);
        setLoadingCharities(false);
      });
  }, []);

  // Handle new donation submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData.entries());

    if (!user || !user.id) {
      setStatus({ type: "error", message: "⚠️ User not logged in." });
      return;
    }

    payload.user_id = Number(user.id);

    const requiredFields = ["item_name", "category", "type", "condition", "charity_name"];
    for (let field of requiredFields) {
      if (!payload[field] || payload[field].trim() === "") {
        setStatus({ type: "error", message: `⚠️ Please fill the ${field} field.` });
        return;
      }
    }

    try {
      const res = await fetch('http://localhost:8000/add_donation.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.status === 'success') {
        setStatus({ type: 'success', message: data.message });
        e.target.reset();
        setFile(null);
        setFile(null);

        // Refresh donations
        // Refresh donations
        fetch(`http://localhost:8000/get_donations.php?user_id=${user.id}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.status === "success") setDonations(data.donations);
          });
      } else {
        setStatus({ type: 'error', message: data.message });
      }
    } catch (err) {
      console.error("Donation submission failed:", err);
      setStatus({ type: "error", message: "⚠️ Network error. Please try again." });
    }

    setTimeout(() => setStatus(null), 6000);
  };

  return (
    <div className="user-dashboard-container">
      <div className="dashboard-left">
        <div className="dashboard">
          <aside className="links">
            <ul>
              <li>
                <i className="fa-solid fa-gauge"></i>
                <a href="/my_impact">My Impact</a>
              </li>
              <li>
                <i className="fa-solid fa-inbox"></i>
                <a href="/my_donations">My Donations</a>
              </li>
              <li>
                <i className="fa-solid fa-user"></i>
                <a href="/my_profile">My Profile</a>
              </li>
              <li>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                <button
                  className="logout-btn"
                  type="button"
                  onClick={() => {
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </aside>

          <main className="dashboard-main">
            <h2>Welcome, {user?.name || "User"}!</h2>
            <p>You are logged in as a {"Donor"}</p>

            <div className="stats-container">
              <div className="stat-card">
                <i className="fa-solid fa-shirt"></i>
                <p className="stat-number">{donations.length}</p>
                <p className="stat-text">Total Items Donated</p>
              </div>

              <div className="stat-card">
                <i className="fa-solid fa-earth-africa"></i>
                <p className="stat-number">{(donations.length * 1.5).toFixed(1)}kg</p>
                <p className="stat-text">CO₂ Saved</p>
              </div>

              <div className="stat-card">
                <i className="fa-solid fa-heart"></i>
                <p className="stat-number">{donations.length * 2}</p>
                <p className="stat-text">People Helped</p>
              </div>
            </div>
          </main>
        </div>

        <div className="donation-history">
          <h3>Recent Donations</h3>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Date</th>
                <th>Charity Selected</th>
                <th>Status</th>
                <th>Pickup Address</th>
                <th>Pickup Address</th>
              </tr>
            </thead>
            <tbody>
              {donations.length > 0 ? (
                donations.map((d) => (
                  <tr key={d.donation_ID}>
                    <td>{d.item_name}</td>
                    <td>{d.donation_date}</td>
                    <td>{d.charity_name}</td>
                    <td>{d.donation_status}</td>
                    <td>{d.pickup_address || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No donations yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="dashboard-right">
        <form className="new-donation" onSubmit={handleSubmit}>
          <h3>Make a New Donation</h3>

          {status && (
            <div className={`form-message ${status.type}`}>
              {status.message}
            </div>
          )}

          <h4>Item Name</h4>
          <input type="text" name="item_name" placeholder="e.g. Brown Jacket" required />

          <h4>Category</h4>
          <select name="category" required>
            <option value="">-- Select Category --</option>
            <option value="womens">Women's</option>
            <option value="mens">Men's</option>
            <option value="girls">Girl's</option>
            <option value="boys">Boy's</option>
          </select>

          <h4>Type</h4>
          <select name="type" required>
            <option value="">-- Select Type --</option>
            <option value="shirt">Shirt</option>
            <option value="trouser">Trouser</option>
            <option value="jacket">Jacket</option>
            <option value="shoe">Shoes</option>
            <option value="other">Other</option>
          </select>

          <h4>Quantity</h4>
          <input
            type="number"
            name="quantity"
            min="1"
            placeholder="Enter quantity"
            required
          />

          <h4>Condition</h4>
          <select name="condition" required>
            <option value="">-- Select Condition --</option>
            <option value="new">New</option>
            <option value="like-new">Like New</option>
            <option value="used-good">Used - Good</option>
            <option value="used-fair">Used - Fair</option>
          </select>

          <h4>Description</h4>
          <textarea name="description" placeholder="Provide a brief description of the item" required />

          <h4>Image</h4>
          <input type="file" onChange={handleChange} />
          {file && (
            <img
              src={file}
              alt="Uploaded preview"
              style={{
                width: '350px',
                height: 'auto',
                borderRadius: '6px',
                display: 'block',
                marginBottom: '8px',
              }}
            />
          )}
          {file && (
            <button
              type="button"
              className="delete-file-btn"
              onClick={handleDeleteFile}
            >
              Delete File
            </button>
          )}

          <h4>Pickup Address</h4>
          <input type="text" name="pickup_address" placeholder="Enter pickup address" required />

          <h4>Select Charity</h4>
          {loadingCharities ? (
            <p>Loading charities...</p>
          ) : (
            <select name="charity_name" required>
              <option value="">-- Select Charity --</option>
              {charities.map((charity) => (
                <option key={charity.charity_ID} value={charity.charity_name}>
                  {charity.charity_name}
                </option>
              ))}
            </select>
          )}

          <button type="submit">Submit Donation</button>
        </form>
      </div>
    </div>
  );
}

export default User_Dashboard;
