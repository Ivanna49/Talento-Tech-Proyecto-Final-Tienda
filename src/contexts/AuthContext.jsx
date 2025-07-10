import React, { createContext, useState, useContext } from 'react';


export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);

  const login = (username) => {
    setUser(username);

    if (username === 'admin@gmail.com') {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  };

  const logout = () => {
    setUser(null);
    setAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, admin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
