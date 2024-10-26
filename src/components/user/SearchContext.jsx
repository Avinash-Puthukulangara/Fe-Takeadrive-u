import React, { createContext, useState } from 'react';

// Create context
export const SearchContext = createContext();

// Context provider component
export const SearchProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [showSearch, setShowSearch] = useState(true);

  return (
    <SearchContext.Provider value={{ cars, setCars, showSearch, setShowSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

