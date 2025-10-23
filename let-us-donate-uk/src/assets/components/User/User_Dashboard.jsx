export function User_Dashboard() {
  return (
    <div>
      <div className="user-overview">
        <h2>Welcome User!</h2>
        <p>Here is your dashboard overview.</p>

        <div className="user-links">
          <ul>
            <li>
              <a href="/user/donations">My Donations</a>
            </li>
            <li>
              <a href="/user/profile">Profile Settings</a>
            </li>
            <li>
              <a href="/user/history">Donation History</a>
            </li>
          </ul>
        </div>

        <div className="user-stats">
          <p>Total Donations Made</p>
          <p>Total Items Donated</p>
          <p>Your CO2 Saved</p>
        </div>

        <div className="my-impact">
          <p>My Impact</p>
      </div>
      </div>

      <div className="donation-history">
        <h3>Recent Donations</h3>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Date Donated</th>
              <th>Charity</th>
              <th>Status</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Jacket</td>
              <td>2024-05-01</td>
              <td>Charity A</td>
              <td>Approved</td>
              <td>In-Transit</td>
            </tr>
            <tr>
              <td>Shoes</td>
              <td>2024-05-01</td>
              <td>Charity B</td> 
              <td>Approved</td> 
              <td>Delivered</td>
              </tr>
              </tbody>     
         </table>
      </div>

      <div className="new-donation">
        <h3>Make a New Donation</h3>
        <h4>Item Name</h4>
        <input type="text" placeholder="e.g Brown Jacket" required />

        <h4>Category</h4>
        <select>
          <option value="clothing">Women's</option>
          <option value="electronics">Men's</option>
          <option value="furniture">Girl's</option>
          <option value="books">Boy's</option>
        </select>

        <h4>Type</h4>
        <select>
          <option value="shirt">Shirt</option>
          <option value="trouser">Trouser</option>
          <option value="jacket">Jacket</option>
          <option value="shoe">Shoes</option>
          <option value="other">Other</option>
        </select>

        <h4>Condition</h4>
        <select>
          <option value="new">New</option>
          <option value="like-new">Like New</option>
          <option value="used-good">Used - Good</option>
          <option value="used-fair">Used - Fair</option>
        </select>
       
        <h4>Description</h4>
        <textarea placeholder="Provide a brief description of the item" required/>

        <h4>Upload Photos</h4>
        <input type="file" multiple />

        <h4>Pickup Address</h4>
        <input type="text" placeholder="Enter your pickup address" required/>

        <h4>Preferred Pickup Date & Time</h4>
        <input type="datetime-local" />

        <h4>Select Charity</h4>
        <select>
          <option value="charity1">Charity 1</option>
          <option value="charity2">Charity 2</option>
          <option value="charity3">Charity 3</option>
          <option value="charity4">Charity 4</option>
        </select>

        <button type="submit">Submit Donation</button>
      </div>
    </div>
  );
}

export default User_Dashboard;
