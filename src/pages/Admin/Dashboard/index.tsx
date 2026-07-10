import React from 'react';
import { useGetDashboardStatsQuery } from '@services/adminService';

const AdminDashboard: React.FC = () => {
  const { data, isLoading } = useGetDashboardStatsQuery();
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      {isLoading ? <p>Loading...</p> : <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default AdminDashboard;

