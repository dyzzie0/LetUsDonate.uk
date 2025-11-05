import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../../css/admin.css';
import { Chart } from 'chart.js/auto';

export function Admin_Dashboard() {
  useEffect(() => {

    // This chart is for donation trends, which is jsut showing how many donations have been made over time.

    const donationCtx = document.getElementById('donationTrends');
    const donationChart = new Chart(donationCtx, {
      type: 'line',
      data: {
        labels: ['1D', '1W', '1M', '3M', '6M', '1Y', 'Max'],
        datasets: [
          {
            label: 'Total Donations',
            data: [10, 20, 30, 40, 50, 60],
            borderColor: '#60a5fa',
            backgroundColor: '#60a5fa10',
            borderWidth: 2,
            fill: true,
            tension: 0.3,
            pointRadius: 4,
            pointBackgroundColor: '#60a5fa',
            weight: 'bold',
            font: { size: 20 },
          },
        ],
      },
      options: {
        plugins: { legend: { display: true }, title: { display: false } },
        scales: { y: { beginAtZero: true } },
      },
    });

    // This chart shows the monthly user trends, so how many users sign up per week, month etc.

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

    // This shows the sustainability impact, so the combinaed c02 reduced and items reused.

    const sustainCtx = document.getElementById('sustainabilityImpact');
    const sustainChart = new Chart(sustainCtx, {
      type: 'bar',
      data: {
        labels: ['1D', '1W', '1M', '3M', '6M', '1Y', 'Max'],
        datasets: [
          {
            label: 'Items Reused',
            data: [15, 25, 40, 45, 55, 65],
            backgroundColor: '#cca2e9',
          },
          {
            label: 'CO₂ Reduced',
            data: [20, 30, 50, 45, 60, 100],
            backgroundColor: '#22d3ee',
          },
        ],
      },
      options: {
        plugins: { legend: { display: true }, title: { display: false } },
        responsive: true,
        scales: { y: { beginAtZero: true } },
      },
    });

    // This chart shows how many people have donated to each charity

    const charityCtx = document.getElementById('charityPerformance');
    const charityChart = new Chart(charityCtx, {
      type: 'pie',
      data: {
        labels: [
          'WearAgain Foundation',
          'Threads of Hope UK',
          'SecondChance Wardrobe',
          'GreenStitch Collective',
        ],
        datasets: [
          {
            data: [10, 15, 20, 25],
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
  }, []);

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
          <ii class="fa-solid fa-arrow-right-from-bracket"></ii>
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
            <p>0</p>
          </div>
          <div>
            <h4>Total Items Accepted</h4>
            <p>0</p>
          </div>
          <div>
            <h4>Total CO₂ Saved</h4>
            <p>0kg</p>
          </div>
          <div>
            <h4>Active Users</h4>
            <p>0</p>
          </div>
        </div>
      </div>

      <div className="data-reports">
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
      </div>
    </div>
  );
}

export default Admin_Dashboard;
