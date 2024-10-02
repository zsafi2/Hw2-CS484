import React from 'react';
import '../public/Search.css';

// Implement the SearchProps interface.
interface SearchProps {
  query: string;
  setQuery: (query: string) => void;
  setCurrentPage: (page: number) => void;
}

// Ensure that the component works properly.
// Every time the user types in the input field, the first page of the results should be displayed.
const Search: React.FC<SearchProps> = ({ query, setQuery, setCurrentPage }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when the query changes
  };

  return (
    <div className="search-container">
      <form className="search-form" role="search">
        <h2 className="search-form-title">Search Products</h2>
        <div className="search-form-group">
          <input
            type="text"
            id="search-query"
            value={query}
            placeholder="Enter product name..."
            onChange={handleInputChange}
            required
          />
        </div>
      </form>
    </div>
  );
};

export default Search;
