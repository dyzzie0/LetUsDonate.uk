import React, { useEffect, useState } from 'react';
import '../../../css/my_impact.css';

import React, { useState } from 'react';
import '../../../css/my_impact.css';
export function My_Impact() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (!user.id) {
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8000/get_donations.php?user_id=${user.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') setDonations(data.donations);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching donations:', err);
        setLoading(false);
      });
  }, [user.id]);

  // Calculate totals
  const totalItems = donations.length;
  const totalCO2 = (totalItems * 1.5).toFixed(1); // kg CO2
  const peopleHelped = totalItems * 2;

  return (
    <main className="dashboard-main">
      <div className="records-container">
        <div className="header-left">
          <h2>My Impact</h2>
        </div>
        <div className="return-right">
          <ul>
            <li>
              <a href="/User_dashboard">Return</a>
            </li>
          </ul>
        </div>
      </div>

      {loading ? (
        <p>Loading your impact...</p>
      ) : (
        <div className="stats-container">
          <div className="stat-card">
            <i className="fa-solid fa-shirt"></i>
            <p className="stat-number">{totalItems}</p>
            <p className="stat-text">Total Items Donated</p>
          </div>

          <div className="stat-card">
            <i className="fa-solid fa-earth-africa"></i>
            <p className="stat-number">{totalCO2} kg</p>
            <p className="stat-text">Total CO₂ Saved</p>
          </div>

          <div className="stat-card">
            <i className="fa-solid fa-heart"></i>
            <p className="stat-number">{peopleHelped}</p>
            <p className="stat-text">People Helped</p>
          </div>
        </div>
      )}
    </main>
  );
}

export default My_Impact;
