import React, { useState } from 'react';
import './Filter.css';

interface FilterValues {
  numPlayers: string;
  minDuration: string;
  maxDuration: string;
  categories: string[];
}

interface FilterProps {
  onFilterApplied: (numPlayers: number, minDuration: number, maxDuration: number, categories: string[]) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterApplied }) => {
  const [filters, setFilters] = useState<FilterValues>({
    numPlayers: '',
    minDuration: '',
    maxDuration: '',
    categories: []
  });
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      categories: checked
        ? [...prevFilters.categories, value]
        : prevFilters.categories.filter((category) => category !== value)
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const numPlayers = parseInt(filters.numPlayers) || 0;
    const minDuration = parseInt(filters.minDuration) || 0;
    const maxDuration = parseInt(filters.maxDuration) || 100;
    // No parsing needed for categories as it's already in the required format

    onFilterApplied(numPlayers, minDuration, maxDuration, filters.categories);
  };


  const categories = ['E1', 'E2', 'E3', 'E4'];

  return (
    <form className="filter-form" onSubmit={handleSubmit}>

      <div className="filter-section">
        <label>Antall spillere:</label>
        <input type="number" name="numPlayers" value={filters.numPlayers} onChange={handleChange} />
      </div>
      <div className="filter-section">
        <label>Min varighet (minutter):</label>
        <input type="number" name="minDuration" value={filters.minDuration} onChange={handleChange} />
      </div>
      <div className="filter-section">
        <label>Max varighet (minutter):</label>
        <input type="number" name="maxDuration" value={filters.maxDuration} onChange={handleChange} />
      </div>
      <div className="filter-section categories">
        <label>Categories:</label>
        {categories.map((category, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={`category-${index}`}
              value={category}
              onChange={handleCategoryChange}
              checked={filters.categories.includes(category)}
            />
            <label htmlFor={`category-${index}`}>{category}</label>
          </div>
        ))}
      </div>
      <button type="submit" className="apply-filter-button">Apply Filters</button>
    </form>
  );
};

export default Filter;
