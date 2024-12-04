import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../provider/AuthContext'; // Asegúrate de que estamos usando el contexto AuthContext

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, role } = useAuth();  // Obtenemos el 'user' y el 'role' del contexto

  // Verificando si estamos esperando los datos del usuario
  if (user === undefined) {
    return <div>Verificando autenticación...</div>;
  }

  // Si el usuario no está autenticado, redirigir al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si el rol no está permitido, redirigir a la página principal u otra página
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  // Si todo está bien, renderizamos el contenido
  return children;
};

export default ProtectedRoute;