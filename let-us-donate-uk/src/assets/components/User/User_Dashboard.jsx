import React from "react";

function DonorDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="middle">
      <h2>Welcome, {user?.name}</h2>
      <p>You are logged in as a {user?.role}</p>

      <div>
        <button onClick={() => alert("Add donation feature coming soon!")}>
          Add Donation
        </button>
      </div>
    </div>
  );
}

export default DonorDashboard;
