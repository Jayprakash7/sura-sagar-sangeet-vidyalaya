import React from 'react';
import { useAuth } from '../context/AuthContext';
import { AdminDashboard } from './dashboards/AdminDashboard';
import { OpsDashboard } from './dashboards/OpsDashboard';
import { UserDashboard } from './dashboards/UserDashboard';
import { LoadingSpinner } from '../components/Common';

export const DashboardPage: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading || !user) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  switch (user.role) {
    case 'ADMIN':
      return <AdminDashboard />;
    case 'OPS_USER':
      return <OpsDashboard />;
    default:
      return <UserDashboard />;
  }
};
