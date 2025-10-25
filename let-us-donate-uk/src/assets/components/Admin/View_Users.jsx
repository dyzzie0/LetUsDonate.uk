import React from "react";
import '../../../css/records.css';

export function View_Users() {
  return (
    <div>
      <main>
        <div className="records-container">
          <div className="header-left">
            <h2>View Users</h2>
          </div>

          <div className="return-right">
            <ul>
              <li>
                <a href="/admin_dashboard">Return</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="filter-bar">
          <input
            type="text"
            placeholder="Search by name..."
            className="search-input"
          />
          <select className="status-filter">
            <option value="">All Roles</option>
            <option value="donor">Donor</option>
            <option value="charity_staff">Charity Staff</option>
            <option value="admin">Admin</option>
          </select>
          <button className="filter-button">Filter</button>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Date Joined</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>John Doe</td>
                <td>gmail.com</td>
                <td>Donor</td>
                <td>2024-01-15</td>
                <td>Active</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jane Smith</td>
                <td>yahoo.com</td>
                <td>Charity Staff</td>
                <td>2023-11-22</td>
                <td>Inactive</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default View_Users;
