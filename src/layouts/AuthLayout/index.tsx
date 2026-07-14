import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = memo(() => {
  return (
    <div className="min-h-screen bg-white">
      <Outlet />
    </div>
  );
});

export default AuthLayout;
