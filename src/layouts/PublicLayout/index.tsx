import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';
import PublicHeader from '@/layouts/features/PublicHeader';
import PublicFooter from '@/layouts/features/PublicFooter';

const PublicLayout: React.FC = memo(() => {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
});

export default PublicLayout;

