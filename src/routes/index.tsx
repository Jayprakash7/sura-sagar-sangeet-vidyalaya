import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '../components/ProtectedRoute';

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
import { DashboardPage } from '../pages/DashboardPage';

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

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
