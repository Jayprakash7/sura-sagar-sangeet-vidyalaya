import React from 'react';
import { EmptyState } from '../../components/Common';
import { Construction } from 'lucide-react';

interface ComingSoonProps {
  title: string;
  description?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ title, description }) => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
    <div className="bg-white rounded-lg shadow-md">
      <EmptyState
        icon={<Construction className="w-10 h-10" />}
        title="Coming soon"
        description={description ?? 'This section is under development.'}
      />
    </div>
  </div>
);

export const PaymentsPage: React.FC = () => (
  <ComingSoon title="Payments" description="Record and track student fee payments." />
);

export const CoursesManagePage: React.FC = () => (
  <ComingSoon title="Courses" description="Create and manage music and dance courses." />
);

export const FacultyManagePage: React.FC = () => (
  <ComingSoon title="Faculty" description="Manage faculty profiles and assignments." />
);

export const UsersPage: React.FC = () => (
  <ComingSoon title="Users" description="Manage user accounts and roles." />
);

export const GalleryManagePage: React.FC = () => (
  <ComingSoon title="Gallery" description="Upload and organize gallery images." />
);

export const AchievementsManagePage: React.FC = () => (
  <ComingSoon title="Achievements" description="Add and manage student achievements." />
);

export const ReportsPage: React.FC = () => (
  <ComingSoon title="Reports" description="View operational and financial reports." />
);

export const SettingsPage: React.FC = () => (
  <ComingSoon title="Settings" description="Configure website and system settings." />
);

export const ProfilePage: React.FC = () => (
  <ComingSoon title="My Profile" description="View and update your profile details." />
);
