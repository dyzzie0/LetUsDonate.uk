import { Link } from 'react-router-dom';

export function Admin_Dashboard() {
  return (
    <div>
    <div className="admin-links">
      <h2>Welcome Admin!</h2>
      <ul>
        <li>
          <Link to="/admin/users">Manage Users</Link>
        </li>
        <li>
          <Link to="/admin/donations">View Donations</Link>
        </li>
        <li>
          <Link to="/admin/reports">Inventory</Link>
        </li>
        <li>
          <Link to="/admin/settings"> Settings</Link>
        </li>
      </ul>
    </div>
    
    <div className="admin-overview">
      <h3>Dashboard Overview</h3>
      <p>Here you can monitor site activity and manage content.</p>
      <div className="Stats">
        <p>Total Donated</p>
        <p>Total Items Accepted</p>
        <p>Total CO2 Saved</p>
        <p>Active Users</p>
      </div>
    </div>

    <div className="Data-reports">
      <h3>Donation Trends</h3>
    <div className="donation-trends">
      {/* Placeholder for donation trends chart */}
    </div>

    <h3>Monthly User Trends</h3>
    <div className="user-trends"></div>
    {/* Placeholder for user trends chart */}
    </div>

    <h3>Sustainability Imapct</h3>
    <div className="sustainability-impact"></div>
    {/* Placeholder for sustainability impact chart */}

    <h3>Charity Performace Comparison</h3>
    <div className="charity-performance-comparison"></div>
    {/* Placeholder for charity performance comparison chart */}
    
  </div>

  );
}
export default Admin_Dashboard;
