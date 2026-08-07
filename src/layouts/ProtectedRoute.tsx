import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const ProtectedRoute: React.FC<{ roles?: string[] }> = ({ roles }) => {
  // const { isLoggedIn, role } = useAuth();
  const role =  'admin';
  const isLoggedIn = true;
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (roles && roles.length && !roles.includes(role as string)) return <Navigate to="/unauth" replace />;
  return <Outlet />;
};

export default ProtectedRoute;

