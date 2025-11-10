import React, { useEffect, useState } from 'react';
import '../../../css/user_charity.css';
import '../../../css/charity.css';

export function Charity_Dashboard() {
  const [donations, setDonations] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [stats, setStats] = useState({ items: 0, co2: 0, people: 0 });
  const [loading, setLoading] = useState(true);

  //This is controlling charity log in if you cannot access the dashboard hash this section out //

  const charity = JSON.parse(localStorage.getItem('charity') || '{}'); 

  useEffect(() => {
    if (!charity.id) {
      window.location.href = '/login';
      return;
    }

  //

    // Fetch donations for this charity
    const fetchData = async () => {
      try {
        const donationRes = await fetch(
          `http://localhost:8000/get_donations.php?charity_id=${charity.id}`
        );
        const donationData = await donationRes.json();

        const inventoryRes = await fetch(
          `http://localhost:8000/get_inventory.php?charity_id=${charity.id}`
        );
        const inventoryData = await inventoryRes.json();

        if (donationData.status === 'success') setDonations(donationData.donations);
        if (inventoryData.status === 'success') setInventory(inventoryData.items);

        const totalItems = donationData.donations?.length || 0;
        setStats({
          items: totalItems,
          co2: (totalItems * 1.5).toFixed(1),
          people: totalItems * 2,
        });

        setLoading(false);
      } catch (err) {
        console.error('Couldnt fetch charity data:', err);
        setLoading(false);
      }
    };

    fetchData();
  }, [charity.id]);

  useEffect(() => {
    if (inventory.length && window.Chart) {
      const xValues = inventory.map((item) => item.type);
      const yValues = inventory.map((item) => item.quantity);
      const barColors = ['#5b7d62', '#76a79b', '#9fc3ab', '#2d484c', '#7e8568'];

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
  }, [inventory]);

  return (
    <div className="charity-dashboard-container">
      <div className="dashboard-left">
        <aside className="links">
          <ul>
            <li>
              <i className="fa-solid fa-shirt"></i>
              <a href="/view_donations">Donations</a>
            </li>
            <li>
              <i className="fa-solid fa-warehouse"></i>
              <a href="/view_inventory">Inventory</a>
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
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
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
          <h2>Welcome, {charity.name} Staff!</h2>

          {loading ? (
            <p>Loading dashboard...</p>
          ) : (
            <>
              <div className="stats-container">
                <div className="stat-card">
                  <i className="fa-solid fa-shirt"></i>
                  <p className="stat-number">{stats.items}</p>
                  <p className="stat-text">Items Donated</p>
                </div>

                <div className="stat-card">
                  <i className="fa-solid fa-leaf"></i>
                  <p className="stat-number">{stats.co2} kg</p>
                  <p className="stat-text">CO₂ Saved</p>
                </div>

                <div className="stat-card">
                  <i className="fa-solid fa-people-group"></i>
                  <p className="stat-number">{stats.people}</p>
                  <p className="stat-text">People Helped</p>
                </div>
              </div>

              <div className="dashboard-right">
                <div className="inventory-chart">
                  <h3>Inventory Overview</h3>
                  <canvas id="myChart" style={{ width: '100%', maxWidth: '700px' }}></canvas>
                </div>
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
                      <th>Status</th>
                      <th>Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donations.length ? (
                      donations.map((d) => (
                        <tr key={d.donation_ID}>
                          <td>{d.user_id}</td>
                          <td>{d.user_name}</td>
                          <td>{d.user_email}</td>
                          <td>{d.category}</td>
                          <td>{d.type}</td>
                          <td>{d.donation_date.split(' ')[0]}</td>
                          <td>{d.donation_status}</td>
                          <td>{d.pickup_address || 'N/A'}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8">No donations yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default Charity_Dashboard;
