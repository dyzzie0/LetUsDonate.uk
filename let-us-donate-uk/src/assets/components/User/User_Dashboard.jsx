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
  useEffect(() => {
    const item = localStorage.getItem("user");
    if (item) setUser(JSON.parse(item));
  }, []);

  // Handle file selection
  const handleChange = (e) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleDeleteFile = () => setFile(null);

  // Fetch user donations
  useEffect(() => {
    if (!user?.id) return;
    fetch(`http://localhost:8000/get_donations.php?user_id=${user.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") setDonations(data.donations);
      });
  }, [user]);

  // Fetch charities
  useEffect(() => {
    fetch('http://localhost:8000/get_charities.php')
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") setCharities(data.charities);
        setLoadingCharities(false);
      })
      .catch(() => setLoadingCharities(false));
  }, []);

  // Handle donation submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.id) return;

    const formData = new FormData(e.target);
    formData.append("user_id", user.id);
    if (file) formData.append("item_image", file);

    try {
      const res = await fetch('http://localhost:8000/add_donation.php', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (data.status === "success") {
        setStatus({ type: "success", message: data.message });
        e.target.reset();
        setFile(null);

        // Refresh donations
        fetch(`http://localhost:8000/get_donations.php?user_id=${user.id}`)
          .then(res => res.json())
          .then(data => {
            if (data.status === "success") setDonations(data.donations);
          });
      } else {
        setStatus({ type: "error", message: data.message });
      }
    } catch (err) {
      setStatus({ type: "error", message: "Network error. Please try again." });
    }

    setTimeout(() => setStatus(null), 6000);
  };

  return (
    <div className="user-dashboard-container">
      <div className="dashboard-left">
        <div className="dashboard">
          <aside className="links">
            <ul>
              <li><i className="fa-solid fa-gauge"></i><a href="/my_impact">My Impact</a></li>
              <li><i className="fa-solid fa-inbox"></i><a href="/my_donations">My Donations</a></li>
              <li><i className="fa-solid fa-user"></i><a href="/my_profile">My Profile</a></li>
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
                <th>Image</th>
                <th>Date</th>
                <th>Charity Selected</th>
                <th>Status</th>
                <th>Pickup Address</th>
              </tr>
            </thead>
            <tbody>
              {donations.length > 0 ? (
                donations.map((d) => (
                  <tr key={d.donation_ID}>
                    <td>{d.item_name}</td>
                    <td>
                      {d.item_image ? (
                        <img
                          src={`http://localhost:8000/uploads/${d.item_image}`}
                          alt={d.item_name}
                          style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                        />
                      ) : "N/A"}
                    </td>
                    <td>{d.donation_date}</td>
                    <td>{d.charity_name}</td>
                    <td>{d.donation_status}</td>
                    <td>{d.pickup_address || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="6">No donations yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="dashboard-right">
        <form className="new-donation" onSubmit={handleSubmit}>
          <h3>Make a New Donation</h3>
          {status && <div className={`form-message ${status.type}`}>{status.message}</div>}

          <input type="text" name="item_name" placeholder="Item Name" required />
          <select name="category" required>
            <option value="">--Category--</option>
            <option value="womens">Women's</option>
            <option value="mens">Men's</option>
            <option value="girls">Girl's</option>
            <option value="boys">Boy's</option>
          </select>
          <select name="type" required>
            <option value="">--Type--</option>
            <option value="shirt">Shirt</option>
            <option value="trouser">Trouser</option>
            <option value="jacket">Jacket</option>
            <option value="shoe">Shoes</option>
            <option value="other">Other</option>
          </select>
          <input type="number" name="quantity" min="1" placeholder="Quantity" required />
          <select name="condition" required>
            <option value="">--Condition--</option>
            <option value="new">New</option>
            <option value="like-new">Like New</option>
            <option value="used-good">Used - Good</option>
            <option value="used-fair">Used - Fair</option>
          </select>
          <textarea name="description" placeholder="Description" required />
          <input type="file" onChange={handleChange} />
          {file && (
            <p>Selected file: {file.name} <button type="button" onClick={handleDeleteFile}>Remove</button></p>
          )}
          <input type="text" name="pickup_address" placeholder="Pickup Address" required />
          {loadingCharities ? <p>Loading charities...</p> : (
            <select name="charity_name" required>
              <option value="">--Select Charity--</option>
              {charities.map(c => (
                <option key={c.charity_ID} value={c.charity_name}>{c.charity_name}</option>
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
