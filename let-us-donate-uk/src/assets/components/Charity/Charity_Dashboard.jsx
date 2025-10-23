import React from 'react';
import '../../../css/charity.css';

export function Charity_Dashboard() {
  return (
    <div>
    <div className="staff-overview">
      <h2>Welcome Charity Staff!</h2>
    


      <div className="staff-links">
        <ul>
          <li>
            <a href="/charity/donations">View Donations</a>
          </li>
          <li>
            <a href="/charity/inventory">Inventory</a>
          </li>
          <li>
            <a href="/charity/requests">Donation Requests</a>
          </li>
        </ul>
    
      </div>

      <div className="staff-stats">
        <p>Total Donations Today</p>
        <p>People Helped Toady</p>
        <p>CO2 Saved Today</p>
      </div>
    </div>

    <div classNmae="invenotry-overview">
      <h3>Inventory</h3>
  
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
