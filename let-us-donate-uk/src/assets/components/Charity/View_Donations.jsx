import React from 'react';
import '../../../css/records.css';

export function View_Donations() {
  return (
    <div>
      <main>
        <div className="records-container">
          <div className="header-left">
            <h2>View Donations</h2>
          </div>

          <div className="return-right">
            <ul>
              <li>
                <a href="/charity_dashboard">Return</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="filter-bar">
          <input
            type="text"
            placeholder="Search by Type..."
            className="search-input"
          />
          <select className="status-filter">
            <option value="">All Statuses</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
          <button className="filter-button">Filter</button>
        </div>

        <div className="table-container">
          <div className="table">
            <table className="table">
              <thead>
                <tr>
                  <th>Donation ID</th>
                  <th>Donor Name</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Date Donated</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>101</td>
                  <td>Alice Johnson</td>
                  <td>Clothes</td>
                  <td>5 items</td>
                  <td>2024-03-10</td>
                  <td>Approved</td>
                </tr>
                <tr>
                  <td>102</td>
                  <td>Bob Smith</td>
                  <td>Toys</td>
                  <td>3 items</td>
                  <td>2024-03-12</td>
                  <td>Pending</td>
                </tr>
                <tr>
                  <td>103</td>
                  <td>Carol White</td>
                  <td>Books</td>
                  <td>10 items</td>
                  <td>2024-03-15</td>
                  <td>Rejected</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default View_Donations;
