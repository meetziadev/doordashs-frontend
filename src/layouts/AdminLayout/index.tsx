import React, { memo, useMemo, useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '@/layouts/features/AdminSidebar';
import AdminTopbar from '@/layouts/features/AdminTopbar';

const AdminLayout: React.FC = memo(() => {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((v) => !v), []);
  const close = useCallback(() => setOpen(false), []);
  return (
    <div className="min-h-screen">
      <AdminSidebar isOpen={open} onClose={close} />
      <AdminTopbar onMenu={toggle} />
      <main className="pt-[80px]! md:pl-[290px] p-4 md:p-6 min-h-screen overflow-auto bg-white">
        <Outlet />
      </main>
    </div>
  );
});

export default AdminLayout;

