import React from 'react';
import { useAuth } from '../context/AuthContext';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { AdminDashboard } from './dashboards/AdminDashboard';
import { OpsDashboard } from './dashboards/OpsDashboard';
import { UserDashboard } from './dashboards/UserDashboard';
import { LoadingSpinner } from '../components/Common';

export const DashboardPage: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const renderDashboard = () => {
    switch (user.role) {
      case 'ADMIN':
        return <AdminDashboard />;
      case 'OPS_USER':
        return <OpsDashboard />;
      default:
        return <UserDashboard />;
    }
  };

  return <DashboardLayout>{renderDashboard()}</DashboardLayout>;
};
