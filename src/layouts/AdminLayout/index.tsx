import React, { memo, useMemo, useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '@/layouts/features/AdminSidebar';
import AdminTopbar from '@/layouts/features/AdminTopbar';

const AdminLayout: React.FC = memo(() => {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  return (
    <div className="min-h-screen">
      <AdminSidebar isOpen={open} onClose={close} />
      <AdminTopbar />
      <main
        className="md:pl-[290px] p-4 md:p-6 min-h-screen overflow-auto bg-white"
        style={{ paddingTop: 'var(--admin-header-height, 100px)' }}
      >
        <Outlet />
      </main>
    </div>
  );
});

export default AdminLayout;

