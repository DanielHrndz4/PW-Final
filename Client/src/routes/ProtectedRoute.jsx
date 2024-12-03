import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../provider/AuthContext';
import { RoleProvider, useRole } from '../provider/RoleProvider';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { role } = useRole();

   if (user === undefined) {
     return <div>Verificando autenticación...</div>;
   }

   if (!user) {
     return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;