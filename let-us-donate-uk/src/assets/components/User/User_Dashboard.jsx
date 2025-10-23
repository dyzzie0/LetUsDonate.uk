import React, { useState } from 'react';
import '../../../css/user.css';

export function User_Dashboard() {
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ type: 'success', message: 'Your donation was submitted!' });
    setTimeout(() => setStatus(null), 7000);
  };

  return (
    <div className="user-dashboard-container">
      <div className="dashboard-left">
        <div className="user-dashboard">
          <aside className="user-links">
            <ul>
              <li>
                <i className="fa-solid fa-gauge"></i>
                <a href="/user/impact">My Impact</a>
              </li>
              <li>
                <i className="fa-solid fa-inbox"></i>
                <a href="/user/donations">My Donations</a>
              </li>
              <li>
                <i className="fa-solid fa-user"></i>
                <a href="/user/profile">My Profile</a>
              </li>
            </ul>
          </aside>

          <main className="user-dashboard-main">
            <h2>Welcome User!</h2>

            <div className="stats-container">
              <div className="stat-card">
                <i className="fa-solid fa-shirt"></i>
                <p className="stat-number">20</p>
                <p className="stat-text">
                  Total
                  <br />
                  Items
                  <br />
                  Donated
                </p>
              </div>

              <div className="stat-card">
                <i className="fa-solid fa-earth-africa"></i>
                <p className="stat-number">30kg</p>
                <p className="stat-text">
                  Total
                  <br />
                  CO2 Saved
                </p>
              </div>

              <div className="stat-card">
                <i className="fa-solid fa-heart"></i>
                <p className="stat-number">10</p>
                <p className="stat-text">
                  People
                  <br />
                  Helped
                </p>
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
                <th>Date Donated</th>
                <th>Charity</th>
                <th>Status</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Jacket</td>
                <td>2024-05-01</td>
                <td>Charity A</td>
                <td>Approved</td>
                <td>In-Transit</td>
              </tr>
              <tr>
                <td>Shoes</td>
                <td>2024-05-01</td>
                <td>Charity B</td>
                <td>Approved</td>
                <td>Delivered</td>
              </tr>
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
          <input type="text" placeholder="e.g Brown Jacket" required />

          <h4>Category</h4>
          <select>
            <option value="womens">Women's</option>
            <option value="mens">Men's</option>
            <option value="girls">Girl's</option>
            <option value="boys">Boy's</option>
          </select>

          <h4>Type</h4>
          <select>
            <option value="shirt">Shirt</option>
            <option value="trouser">Trouser</option>
            <option value="jacket">Jacket</option>
            <option value="shoe">Shoes</option>
            <option value="other">Other</option>
          </select>

          <h4>Condition</h4>
          <select>
            <option value="new">New</option>
            <option value="like-new">Like New</option>
            <option value="used-good">Used - Good</option>
            <option value="used-fair">Used - Fair</option>
          </select>

          <h4>Description</h4>
          <textarea
            placeholder="Provide a brief description of the item"
            required
          />

          <h4>Upload Photos</h4>
          <input type="file" multiple />

          <h4>Pickup Address</h4>
          <input type="text" placeholder="Enter your pickup address" required />

          <h4>Preferred Pickup Date & Time</h4>
          <input type="datetime-local" />

          <h4>Select Charity</h4>
          <select>
            <option value="charity1">Charity 1</option>
            <option value="charity2">Charity 2</option>
            <option value="charity3">Charity 3</option>
            <option value="charity4">Charity 4</option>
          </select>

          <button type="submit">Submit Donation</button>
        </form>
      </div>
    </div>
  );
}

export default User_Dashboard;
