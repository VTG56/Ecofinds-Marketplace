import React, { useState } from 'react';

const SearchBar = ({ onSearch, placeholder }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  const styles = {
    searchBar: {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
    },

    input: {
      width: '100%',
      margin : '100px',
      padding: '14px 16px',
      border: '2px solid #d1d5db', // border-gray-300
      borderRadius: '8px',
      fontSize: '1rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      outline: 'none',
      
      transition: 'all 0.2s ease',
      minHeight: '40px',
      backgroundColor: '#ffffff',
      color: '#374151',
    },

    inputFocus: {
      borderColor: '#10b981', // ring-green-500
      boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)',
    }
  };

  return (
    <div style={styles.searchBar}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder || "Search..."}
        style={styles.input}
        onFocus={(e) => {
          Object.assign(e.target.style, styles.inputFocus);
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#d1d5db';
          e.target.style.boxShadow = 'none';
        }}
      />
    </div>
  );
};

export default SearchBar;