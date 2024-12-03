import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../provider/AuthContext';
import { useRole } from '../provider/RoleProvider';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();  // Usamos el contexto de autenticación para verificar si el usuario está autenticado
  const { role } = useRole();   // Usamos el contexto de roles para verificar el rol del usuario

  // Si el usuario no ha sido verificado aún
  if (user === undefined) {
    return <div>Verificando autenticación...</div>;
  }

  // Si no hay usuario autenticado, redirige al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si el rol no es permitido, redirige a la página principal
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  // Si el usuario está autenticado y tiene el rol adecuado, renderiza el contenido
  return children;
};

export default ProtectedRoute;
