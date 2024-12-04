import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
const AuthContext = createContext();

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  // El rol se obtiene del usuario o de localStorage si no se encuentra
  const [role, setRole] = useState(() => {
    const savedRole = localStorage.getItem("role");
    return savedRole ? JSON.parse(savedRole) : null;
  });

  useEffect(() => {
    if (user) {
      // Si el usuario está logueado, actualizamos el rol
      setRole(user.role);
      localStorage.setItem('role', JSON.stringify(user.role)); // Guardamos el rol en localStorage
    } else {
      setRole(null); // Si no hay usuario, el rol debe ser null
    }
  }, [user]);

  // Función para el login
  const login = (userData) => {
    setUser(userData); // Guardamos los datos del usuario
    localStorage.setItem('user', JSON.stringify(userData)); // Guardamos los datos en localStorage
    setRole(userData.role); // Aseguramos que el rol también esté configurado
    localStorage.setItem('role', JSON.stringify(userData.role)); // Guardamos el rol en localStorage
  };

  // Función para el logout
  const logout = () => {
    setUser(null); // Limpiamos el estado del usuario
    setRole(null); // Limpiamos el estado del rol
    localStorage.removeItem('user'); // Eliminamos el usuario del localStorage
    localStorage.removeItem('role'); // Eliminamos el rol del localStorage
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
