import React, { createContext, useContext, useState, useEffect } from "react";

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(() => {
    // Restaurar el rol desde localStorage al iniciar
    const savedRole = localStorage.getItem("role");
    return savedRole ? JSON.parse(savedRole) : null; // Si no hay rol, usa null
  });

  // Guardar el rol en localStorage cuando cambie
  useEffect(() => {
    if (role) {
      localStorage.setItem("role", JSON.stringify(role));
    } else {
      localStorage.removeItem("role"); // Limpia el almacenamiento si no hay rol
    }
  }, [role]);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);