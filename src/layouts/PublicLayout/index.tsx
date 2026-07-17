import React, { memo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import PublicHeader from '@/layouts/features/PublicHeader';
import PublicFooter from '@/layouts/features/PublicFooter';

const PublicLayout: React.FC = memo(() => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
      {!isHomePage && <PublicHeader />}
      <main className="flex-1">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
});

export default PublicLayout;

