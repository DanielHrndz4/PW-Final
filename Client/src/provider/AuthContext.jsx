import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
const AuthContext = createContext();

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return null;
    }
  });

  const [role, setRole] = useState(() => {
    try {
      const savedRole = localStorage.getItem("role");
      return savedRole ? JSON.parse(savedRole) : null;
    } catch (error) {
      console.error("Error parsing role from localStorage:", error);
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      setRole(user.role);
      localStorage.setItem('role', JSON.stringify(user.role));
    } else {
      setRole(null);
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setRole(userData.role);
    localStorage.setItem('role', JSON.stringify(userData.role));
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
