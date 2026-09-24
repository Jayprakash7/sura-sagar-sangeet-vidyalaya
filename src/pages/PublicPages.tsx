import React from 'react';
import { PublicLayout } from '../layouts/PublicLayout';
import { LoadingSpinner } from '../components/Common';

export const AboutPage: React.FC = () => {
  return (
    <PublicLayout>
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h1 className="text-4xl font-serif font-bold mb-8">About Sura Sagar Sangeet Vidyalaya</h1>
          <div className="prose max-w-none">
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              This page will showcase the institution's history, philosophy, journey, and values.
            </p>
            <p className="text-gray-400">Content coming soon...</p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export const VisionMissionPage: React.FC = () => {
  return (
    <PublicLayout>
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h1 className="text-4xl font-serif font-bold mb-8">Vision & Mission</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">Vision</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                To preserve and promote India's rich heritage of music and dance while nurturing the next 
                generation of passionate, disciplined, creative, and accomplished artists.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Mission</h2>
              <ul className="space-y-3 text-gray-600">
                <li>• Provide quality education in music and dance</li>
                <li>• Preserve Indian classical and traditional performing arts</li>
                <li>• Encourage young artistic talent</li>
                <li>• Develop discipline, confidence and creativity</li>
                <li>• Provide opportunities for stage performances</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export const CoursesPage: React.FC = () => {
  return (
    <PublicLayout>
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h1 className="text-4xl font-serif font-bold mb-8">Our Courses</h1>
          <div className="text-center text-gray-400">
            <LoadingSpinner />
            <p className="mt-4">Courses will be loaded from Firestore...</p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export const MusicPage: React.FC = () => {
  return (
    <PublicLayout>
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h1 className="text-4xl font-serif font-bold mb-8">Music Programs</h1>
          <p className="text-gray-600 text-lg">Music education page content coming soon...</p>
        </div>
      </section>
    </PublicLayout>
  );
};

export const DancePage: React.FC = () => {
  return (
    <PublicLayout>
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h1 className="text-4xl font-serif font-bold mb-8">Dance Programs</h1>
          <p className="text-gray-600 text-lg">Dance education page content coming soon...</p>
        </div>
      </section>
    </PublicLayout>
  );
};

export const FacultyPage: React.FC = () => {
  return (
    <PublicLayout>
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h1 className="text-4xl font-serif font-bold mb-8">Our Faculty</h1>
          <div className="text-center text-gray-400">
            <LoadingSpinner />
            <p className="mt-4">Faculty members will be loaded from Firestore...</p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export const AchievementsPage: React.FC = () => {
  return (
    <PublicLayout>
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h1 className="text-4xl font-serif font-bold mb-8">Achievements</h1>
          <div className="text-center text-gray-400">
            <LoadingSpinner />
            <p className="mt-4">Achievements will be loaded from Firestore...</p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export const GalleryPage: React.FC = () => {
  return (
    <PublicLayout>
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h1 className="text-4xl font-serif font-bold mb-8">Gallery</h1>
          <div className="text-center text-gray-400">
            <LoadingSpinner />
            <p className="mt-4">Gallery images will be loaded from Firebase Storage...</p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export const ContactPage: React.FC = () => {
  return (
    <PublicLayout>
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h1 className="text-4xl font-serif font-bold mb-8">Contact Us</h1>
          <p className="text-gray-600 text-lg">Contact form coming soon...</p>
        </div>
      </section>
    </PublicLayout>
  );
};
