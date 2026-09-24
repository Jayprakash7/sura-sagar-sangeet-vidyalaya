import React from 'react';
import { StatCard, Card } from '../../components/ui/Card';
import { useAuth } from '../../context/AuthContext';
import { GraduationCap, CreditCard, Activity, Clock } from 'lucide-react';

export const OpsDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome, {user?.name}
        </h1>
        <p className="text-gray-500">Operations overview</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Students" value={0} icon={<GraduationCap className="w-6 h-6" />} accent="primary" />
        <StatCard title="Active Students" value={0} icon={<Activity className="w-6 h-6" />} accent="green" />
        <StatCard title="Payments Today" value={0} icon={<CreditCard className="w-6 h-6" />} accent="blue" />
        <StatCard title="Pending Dues" value={0} icon={<Clock className="w-6 h-6" />} accent="red" />
      </div>

      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Quick Actions</h2>
        <p className="text-gray-500 text-sm">
          Use the sidebar to manage students, record payments, and view reports.
        </p>
      </Card>
    </div>
  );
};
