import React from 'react';
import '../../../css/charity.css';
import Chart from 'chart.js/auto';

export function Charity_Dashboard() {
  return (
    <div className="charity-dashboard">
      <div className="staff-overview">
        <aside className="staff-links">
          <ul>
            <li>
              <i className="fa-solid fa-shirt"></i>
              <span>Donations</span>
            </li>
            <li>
              <i className="fa-solid fa-warehouse"></i>
              <span>Inventory</span>
            </li>
            <li>
              <i className="fa-solid fa-hand-holding-heart"></i>
              <span>Requests</span>
            </li>
          </ul>
        </aside>
        <main className="staff-dashboard-main">
          <h2>Welcome Charity Staff!</h2>

          <div className="staff-stats">
            <div className="staff-card">
              <i className="fa-solid fa-shirt"></i>
              <p className="staff-number">45</p>
              <p>Total Donations Today</p>
            </div>

            <div className="staff-card">
              <i className="fa-solid fa-people-group"></i>
              <p className="staff-number">23</p>
              <p>People Helped Today</p>
            </div>

            <div className="staff-card">
              <i className="fa-solid fa-leaf"></i>
              <p className="staff-number">58kg</p>
              <p>CO₂ Saved Today</p>
            </div>
          </div>
        </main>
      </div>

      <div classNmae="invenotry-overview">
        <h3>Inventory</h3>

        {/* Pie Chart for Inventory Overview */}
      </div>

      <div className="donation-history">
        <h3>Recent Donations</h3>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Category</th>
              <th>Type</th>
              <th>Date Donated</th>
              <th>Status</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>User 1</td>
              <td>Clothing</td>
              <td>Jacket</td>
              <td>2024-05-01</td>
              <td>Approved</td>
              <td>In-Transit</td>
            </tr>
            <tr>
              <td>User 2</td>
              <td>Footwear</td>
              <td>Shoes</td>
              <td>2024-05-01</td>
              <td>Approved</td>
              <td>Delivered</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Charity_Dashboard;
