import React, { createContext, useState } from 'react';

// Create a context
export const UserContext = createContext();

// Context provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'Guest',
    isAuthenticated: false,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
