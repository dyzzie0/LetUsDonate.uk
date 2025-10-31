import React, { useState } from 'react';
import '../../../css/records.css';

export function View_Inventory() {
  const [filters, setFilters] = useState({
    category: '',
    type: '',
    condition: '',
  });

  const [inventory] = useState([
    {
      id: 1,
      name: 'Brown Jacket',
      category: "Men's",
      type: 'Jacket',
      condition: 'Like New',
      quantity: 2,
    },
    {
      id: 2,
      name: 'Blue Shirt',
      category: "Women's",
      type: 'Shirt',
      condition: 'New',
      quantity: 4,
    },
    {
      id: 3,
      name: 'Kids Shoes',
      category: "Boy's",
      type: 'Shoes',
      condition: 'Used - Good',
      quantity: 3,
    },
    {
      id: 4,
      name: 'Winter Coat',
      category: "Men's",
      type: 'Jacket',
      condition: 'Used - Fair',
      quantity: 1,
    },
  ]);

  const filteredInventory = inventory.filter((item) => {
    return (
      (filters.category == '' || item.category == filters.category) &&
      (filters.type == '' || item.type == filters.type) &&
      (filters.condition == '' || item.condition == filters.condition)
    );
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div>
      <main>
        <div className="records-container">
          <div className="header-left">
            <h2>Inventory</h2>
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
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
          >
            <option value="">All Categories</option>
            <option value="Women's">Women's</option>
            <option value="Men's">Men's</option>
            <option value="Girl's">Girl's</option>
            <option value="Boy's">Boy's</option>
          </select>

          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
          >
            <option value="">All Types</option>
            <option value="Shirt">Shirt</option>
            <option value="Trouser">Trouser</option>
            <option value="Jacket">Jacket</option>
            <option value="Shoes">Shoes</option>
            <option value="Other">Other</option>
          </select>

          <select
            name="condition"
            value={filters.condition}
            onChange={handleFilterChange}
          >
            <option value="">All Conditions</option>
            <option value="New">New</option>
            <option value="Like New">Like New</option>
            <option value="Used - Good">Used - Good</option>
            <option value="Used - Fair">Used - Fair</option>
          </select>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Item ID</th>
                <th>Item Name</th>
                <th>Category</th>
                <th>Type</th>
                <th>Condition</th>
                <th>Quantity</th>
                <th>C02 Saved Per Item</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.length > 0 ? (
                filteredInventory.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.type}</td>
                    <td>{item.condition}</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No items match the selected filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default View_Inventory;
