import React, { useState } from 'react';
import '../../../css/records.css';

export function My_Donations() {
  return (
     <main>
        <div className="records-container">
          <div className="header-left">
            <h2>Donation History</h2>
          </div>

          <div className="return-right">
            <ul>
              <li>
                <a href="/User_dashboard">Return</a>
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
                  <th>Category</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>condition</th>
                  <th>Date Donated</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Womens</td>
                  <td>Shirt</td>
                  <td>Never worn</td>
                  <td>Good</td>
                  <td>2024-03-10</td>
                  <td>Approved</td>
                </tr>
                <tr>
                  <td>Mens</td>
                  <td>Trouser</td>
                  <td>Worn a handful of times</td>
                  <td>Good</td>
                  <td>2024-03-12</td>
                  <td>Pending</td>
                </tr>
                <tr>
                  <td>Womens</td>
                  <td>Skirt</td>
                  <td>Never worn</td>
                  <td>Good</td>
                  <td>2024-03-15</td>
                  <td>Rejected</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
   
    
  );
}

export default My_Donations;
