import React from 'react';
import { NavLink } from 'react-router-dom';
import type { UserRole } from '../types';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  UserCog,
  CreditCard,
  Image,
  Award,
  FileText,
  Settings,
  X,
} from 'lucide-react';

interface NavItem {
  label: string;
  to: string;
  icon: React.ReactNode;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', to: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" />, roles: ['ADMIN', 'OPS_USER', 'USER'] },
  { label: 'Students', to: '/dashboard/students', icon: <GraduationCap className="w-5 h-5" />, roles: ['ADMIN', 'OPS_USER'] },
  { label: 'Payments', to: '/dashboard/payments', icon: <CreditCard className="w-5 h-5" />, roles: ['ADMIN', 'OPS_USER'] },
  { label: 'Courses', to: '/dashboard/courses', icon: <BookOpen className="w-5 h-5" />, roles: ['ADMIN'] },
  { label: 'Faculty', to: '/dashboard/faculty', icon: <UserCog className="w-5 h-5" />, roles: ['ADMIN'] },
  { label: 'Users', to: '/dashboard/users', icon: <Users className="w-5 h-5" />, roles: ['ADMIN'] },
  { label: 'Gallery', to: '/dashboard/gallery', icon: <Image className="w-5 h-5" />, roles: ['ADMIN'] },
  { label: 'Achievements', to: '/dashboard/achievements', icon: <Award className="w-5 h-5" />, roles: ['ADMIN'] },
  { label: 'Reports', to: '/dashboard/reports', icon: <FileText className="w-5 h-5" />, roles: ['ADMIN', 'OPS_USER'] },
  { label: 'My Profile', to: '/dashboard/profile', icon: <UserCog className="w-5 h-5" />, roles: ['USER'] },
  { label: 'Settings', to: '/dashboard/settings', icon: <Settings className="w-5 h-5" />, roles: ['ADMIN'] },
];

interface SidebarProps {
  role: UserRole;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ role, isOpen, onClose }) => {
  const items = navItems.filter((item) => item.roles.includes(role));

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 z-40 transform transition-transform duration-200 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="w-9 h-9 rounded-full object-contain" />
            <span className="font-serif font-bold text-gray-900">SSSV Admin</span>
          </div>
          <button className="lg:hidden p-1" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/dashboard'}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};
