import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../css/admin.css';
import { Chart } from 'chart.js/auto';

export function Admin_Dashboard() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all donations (for admin)
    fetch('http://localhost:8000/get_donations.php')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          setDonations(data.donations);
        } else {
          console.error('Error loading donations:', data.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Network error:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (loading || donations.length === 0) return;

    // === Donation Trends Chart ===
    const donationCtx = document.getElementById('donationTrends');
    const donationChart = new Chart(donationCtx, {
      type: 'line',
      data: {
        labels: donations.slice(0, 10).map(d => d.donation_date.split(' ')[0]),
        datasets: [
          {
            label: 'Total Donations',
            data: donations.map((_, i) => i + 1),
            borderColor: '#60a5fa',
            backgroundColor: '#60a5fa10',
            borderWidth: 2,
            fill: true,
            tension: 0.3,
            pointRadius: 4,
            pointBackgroundColor: '#60a5fa',
          },
        ],
      },
      options: {
        plugins: { legend: { display: true }, title: { display: false } },
        scales: { y: { beginAtZero: true } },
      },
    });

    // === User Trends Chart ===
    const userCtx = document.getElementById('userTrends');
    const userChart = new Chart(userCtx, {
      type: 'line',
      data: {
        labels: ['1D', '1W', '1M', '3M', '6M', '1Y', 'Max'],
        datasets: [
          {
            label: 'Users',
            data: [20, 25, 50, 45, 35, 100],
            borderColor: '#22d3ee',
            backgroundColor: '#22d3ee30',
            fill: true,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: '#22d3ee',
          },
        ],
      },
      options: {
        plugins: { legend: { display: true }, title: { display: false } },
        scales: { y: { beginAtZero: true } },
      },
    });

    // === Sustainability Impact Chart ===
    const sustainCtx = document.getElementById('sustainabilityImpact');
    const sustainChart = new Chart(sustainCtx, {
      type: 'bar',
      data: {
        labels: ['Items Reused', 'CO₂ Reduced (kg)'],
        datasets: [
          {
            label: 'Impact',
            data: [donations.length, donations.length * 1.5],
            backgroundColor: ['#cca2e9', '#22d3ee'],
          },
        ],
      },
      options: {
        plugins: { legend: { display: true }, title: { display: false } },
        responsive: true,
        scales: { y: { beginAtZero: true } },
      },
    });

    // === Charity Performance Chart ===
    const charities = {};
    donations.forEach((d) => {
      charities[d.charity_name] = (charities[d.charity_name] || 0) + 1;
    });

    const charityCtx = document.getElementById('charityPerformance');
    const charityChart = new Chart(charityCtx, {
      type: 'pie',
      data: {
        labels: Object.keys(charities),
        datasets: [
          {
            data: Object.values(charities),
            backgroundColor: ['#60a5fa', '#22d3ee', '#34d399', '#a7f3d0'],
          },
        ],
      },
      options: {
        plugins: { legend: { position: 'right' } },
        responsive: true,
      },
    });

    return () => {
      donationChart.destroy();
      userChart.destroy();
      sustainChart.destroy();
      charityChart.destroy();
    };
  }, [donations, loading]);

  // === Simple Dashboard Stats ===
  const totalDonations = donations.length;
  const totalCO2Saved = (totalDonations * 1.5).toFixed(1);
  const activeUsers = new Set(donations.map((d) => d.charity_name)).size;

  return (
    <div className="admin-dashboard">
      <div className="admin-links">
        <h2>Welcome Admin!</h2>
        <li>
          <ii className="fa-solid fa-users"></ii>
          <Link to="/view_users">View Users</Link>
        </li>
        <li>
          <ii className="fa-solid fa-database"></ii>
          <Link to="/view_inventory">View Inventory</Link>
        </li>
        <li>
          <ii className="fa-solid fa-hand-holding-heart"></ii>
          <Link to="/view_donations">Donations</Link>
        </li>
        <li>
          <ii className="fa-solid fa-chart-line"></ii>
          <Link to="/data_reports">Data Reports</Link>
        </li>
        <li>
          <ii className="fa-solid fa-arrow-right-from-bracket"></ii>
          <button
            className="admin-button"
            onClick={() => {
              localStorage.removeItem('admin');
              window.location.href = '/login';
            }}
          >
            Logout
          </button>
        </li>
      </div>

      <div className="admin-overview">
        <div className="Stats">
          <div>
            <h4>Total Items Donated</h4>
            <p>{totalDonations}</p>
          </div>
          <div>
            <h4>Total Items Accepted</h4>
            <p>{totalDonations}</p>
          </div>
          <div>
            <h4>Total CO₂ Saved</h4>
            <p>{totalCO2Saved} kg</p>
          </div>
          <div>
            <h4>Active Charities</h4>
            <p>{activeUsers}</p>
          </div>
        </div>
      </div>

      <div className="data-reports">
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <>
            <div className="chart-card">
              <h3>Donation Trends</h3>
              <canvas id="donationTrends"></canvas>
            </div>
            <div className="chart-card">
              <h3>Monthly User Trends</h3>
              <canvas id="userTrends"></canvas>
            </div>
            <div className="chart-card">
              <h3>Sustainability Impact</h3>
              <canvas id="sustainabilityImpact"></canvas>
            </div>
            <div className="chart-card">
              <h3>Charity Performance Comparison</h3>
              <canvas id="charityPerformance"></canvas>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Admin_Dashboard;
