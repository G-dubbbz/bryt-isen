import React from "react";
import "./Search.css"; // make sure to import the CSS file

const Search: React.FC<{ onSearch: (searchTerm: string) => void }> = ({
  onSearch,
}) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search..."
        className="search-input"
        onChange={(e) => onSearch(e.target.value)} // Added onChange handler
      />
    </div>
  );
};

export default Search;
