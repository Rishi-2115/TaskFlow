import React from 'react';
import '../../styles/FilterPanel.css';

const FilterPanel = ({ filters, setFilters }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (e) => {
    setFilters(prev => ({ ...prev, searchTerm: e.target.value }));
  };

  const clearFilters = () => {
    setFilters({
      status: 'all',
      priority: 'all',
      searchTerm: ''
    });
  };

  return (
    <div className="filter-panel">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search tasks..."
          value={filters.searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      
      <div className="filters-container">
        <div className="filter-group">
          <label>Status:</label>
          <select 
            name="status" 
            value={filters.status} 
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Priority:</label>
          <select 
            name="priority" 
            value={filters.priority} 
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        
        <button 
          onClick={clearFilters} 
          className="btn btn-sm btn-outline-secondary clear-filters-btn"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
