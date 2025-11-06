import React, { useEffect } from 'react';
import '../../../css/user_charity.css';
import '../../../css/charity.css';

export function Charity_Dashboard() {
  useEffect(() => {
    const xValues = ['Shirt', 'Trouser', 'Jacket', 'Footwaer', 'Other'];
    const yValues = [2, 1, 1, 2, 2];
    const barColors = ['#5b7d62', '#76a79b', '#9fc3ab', '#2d484c', '#7e8568'];

    if (window.Chart) {
      new window.Chart('myChart', {
        type: 'pie',
        data: {
          labels: xValues,
          datasets: [
            {
              backgroundColor: barColors,
              data: yValues,
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: 'Current Inventory Overview',
          },
          responsive: true,
        },
      });
    }
  }, []);

  return (
    <div className="charity-dashboard-container">
      <div className="dashboard-left">
        <div className="dashboard">
          <aside className="links">
            <ul>
              <li>
                <i className="fa-solid fa-shirt"></i>
                <a href="/view_donations">Donations</a>
              </li>
              <li>
                <i className="fa-solid fa-warehouse"></i>
                <a href="/view_inventory">View Inventory</a>
              </li>
              <li>
                <i className="fa-solid fa-hand-holding-heart"></i>
                <a href="/approve_donations">Approve Donations</a>
              </li>
              <li>
                <i className="fa-solid fa-truck"></i>
                <a href="/distribution_records">Distributions</a>
              </li>
              <li>
                <button
                  className="logout-btn"
                  onClick={() => {
                    localStorage.removeItem('charity');
                    window.location.href = '/login';
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </aside>

          <main className="dashboard-main">
            <h2>Welcome Charity Staff!</h2>

            <div className="stats-container">
              <div className="stat-card">
                <i className="fa-solid fa-shirt"></i>
                <p className="stat-number">20</p>
                <p className="stat-text">
                  Items
                  <br />
                  Donated
                  <br />
                  Today
                </p>
              </div>

              <div className="stat-card">
                <i className="fa-solid fa-leaf"></i>
                <p className="stat-number">30kg</p>
                <p className="stat-text">
                  CO₂
                  <br />
                  Saved
                  <br />
                  Today
                </p>
              </div>

              <div className="stat-card">
                <i className="fa-solid fa-people-group"></i>
                <p className="stat-number">10</p>
                <p className="stat-text">
                  People
                  <br />
                  Helped
                  <br />
                  Today
                </p>
              </div>
            </div>
            <div className="dashboard-right">
              <div className="inventory-chart">
                <h3>Inventory</h3>
                <canvas
                  id="myChart"
                  style={{ width: '100%', maxWidth: '700px' }}
                ></canvas>
              </div>
            </div>
          </main>
        </div>
        <div className="donation-history">
          <h3>Recent Donations</h3>
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Category</th>
                <th>Type</th>
                <th>Date Donated</th>
                <th>Charity Chosen</th>
                <th>Status</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Bro</td>
                <td>gmail.com</td>
                <td>Jacket</td>
                <td>Clothes</td>
                <td>2024-05-01</td>
                <td>Charity A</td>
                <td>Approved</td>
                <td>In-Transit</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Charity_Dashboard;
