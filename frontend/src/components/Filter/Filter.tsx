import React, { useState } from 'react';
import './Filter.css';

interface FilterValues {
  numPlayers: string;
  minDuration: string;
  maxDuration: string;
}


interface FilterProps {
  onFilterApplied: (numPlayers: number, minDuration: number, maxDuration: number) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterApplied }) => {
  const [filters, setFilters] = useState<FilterValues>({
    numPlayers: '',
    minDuration: '',
    maxDuration: '',
  });
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const numPlayers = parseInt(filters.numPlayers) || 0;
    const minDuration = parseInt(filters.minDuration) || 0;
    const maxDuration = parseInt(filters.maxDuration) || 100;

    onFilterApplied(numPlayers, minDuration, maxDuration);
  };


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
      <button type="submit">Apply Filters</button>
    </form>
  );
};

export default Filter;
