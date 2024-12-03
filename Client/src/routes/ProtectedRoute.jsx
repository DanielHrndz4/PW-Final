import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../provider/AuthContext';  // Asegúrate de importar el contexto AuthContext
import { useRole } from '../provider/RoleProvider';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();  // Accede a 'user' desde el contexto de autenticación
  const { role } = useRole();   // Accede a 'role' desde el contexto de roles

  // Verificando autenticación
  if (user === undefined) {
    return <div>Verificando autenticación...</div>;
  }

  // Si no hay usuario, redirigir al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si el rol no está permitido, redirigir al home o página predeterminada
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  // Si todo está bien, renderizar los componentes hijos
  return children;
};

export default ProtectedRoute;
