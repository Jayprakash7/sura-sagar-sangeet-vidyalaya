import React from 'react';
import { useAuth } from '../context/AuthContext';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="container-custom section-padding">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-serif font-bold mb-4">Dashboard</h1>
        <p className="text-gray-600 mb-4">
          Welcome back, <span className="font-bold">{user?.name}</span>!
        </p>
        <p className="text-gray-600 mb-4">
          Role: <span className="font-bold text-primary-600">{user?.role}</span>
        </p>
        <p className="text-gray-400">Dashboard content will be customized based on user role...</p>
      </div>
    </div>
  );
};
