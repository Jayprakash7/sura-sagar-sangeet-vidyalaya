import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute, RoleProtectedRoute } from '../components/ProtectedRoute';

// Pages
import { HomePage } from '../pages/HomePage';
import {
  AboutPage,
  VisionMissionPage,
  CoursesPage,
  MusicPage,
  DancePage,
  FacultyPage,
  AchievementsPage,
  GalleryPage,
  ContactPage,
} from '../pages/PublicPages';
import { LoginPage, UnauthorizedPage } from '../pages/AuthPages';
import { SetupAdminPage } from '../pages/SetupAdminPage';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { DashboardPage } from '../pages/DashboardPage';
import { StudentsPage } from '../pages/dashboards/StudentsPage';
import {
  PaymentsPage,
  CoursesManagePage,
  FacultyManagePage,
  UsersPage,
  GalleryManagePage,
  AchievementsManagePage,
  ReportsPage,
  SettingsPage,
  ProfilePage,
} from '../pages/dashboards/DashboardSections';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/vision-mission" element={<VisionMissionPage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/music" element={<MusicPage />} />
      <Route path="/dance" element={<DancePage />} />
      <Route path="/faculty" element={<FacultyPage />} />
      <Route path="/achievements" element={<AchievementsPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/contact" element={<ContactPage />} />

      {/* Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* One-time admin setup - REMOVE after creating first admin */}
      <Route path="/setup" element={<SetupAdminPage />} />

      {/* Protected Dashboard Routes (nested under shared layout) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route
          path="students"
          element={
            <RoleProtectedRoute requiredRoles={['ADMIN', 'OPS_USER']}>
              <StudentsPage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="payments"
          element={
            <RoleProtectedRoute requiredRoles={['ADMIN', 'OPS_USER']}>
              <PaymentsPage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="reports"
          element={
            <RoleProtectedRoute requiredRoles={['ADMIN', 'OPS_USER']}>
              <ReportsPage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="courses"
          element={
            <RoleProtectedRoute requiredRoles="ADMIN">
              <CoursesManagePage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="faculty"
          element={
            <RoleProtectedRoute requiredRoles="ADMIN">
              <FacultyManagePage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="users"
          element={
            <RoleProtectedRoute requiredRoles="ADMIN">
              <UsersPage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="gallery"
          element={
            <RoleProtectedRoute requiredRoles="ADMIN">
              <GalleryManagePage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="achievements"
          element={
            <RoleProtectedRoute requiredRoles="ADMIN">
              <AchievementsManagePage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="settings"
          element={
            <RoleProtectedRoute requiredRoles="ADMIN">
              <SettingsPage />
            </RoleProtectedRoute>
          }
        />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
