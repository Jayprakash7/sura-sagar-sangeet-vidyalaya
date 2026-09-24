import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Zap, Users, Award } from 'lucide-react';
import { PublicLayout } from '../layouts/PublicLayout';

export const HomePage: React.FC = () => {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-700 via-primary-600 to-secondary-700 text-white section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="animate-fade-in text-center lg:text-left order-2 lg:order-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4">
                Sura Sagar Sangeet Vidyalaya
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-primary-50 mb-6 sm:mb-8">
                Preserving Tradition. Nurturing Talent. Inspiring Through Music & Dance.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link
                  to="/courses"
                  className="btn-primary bg-white text-primary-600 hover:bg-gray-100 text-center"
                >
                  Explore Courses
                </Link>
                <Link
                  to="/contact"
                  className="btn-outline border-white text-white hover:bg-white hover:text-primary-600 text-center"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="w-40 h-40 sm:w-56 sm:h-56 lg:w-full lg:h-full lg:aspect-square bg-white bg-opacity-10 rounded-full backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-8">
                <img
                  src="/logo.png"
                  alt="Sura Sagar Sangeet Vidyalaya"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-center mb-8 sm:mb-12">About Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4">
                Sura Sagar Sangeet Vidyalaya is a premier institution dedicated to preserving
                and promoting India's rich heritage of classical music and dance.
              </p>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                With a team of experienced faculty and state-of-the-art facilities, we provide
                comprehensive training in both traditional and contemporary performing arts.
              </p>
            </div>
            <div className="bg-gray-50 p-6 sm:p-8 rounded-lg">
              <h3 className="font-bold text-xl mb-4">Our Commitment</h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <Zap className="w-5 h-5 text-primary-600 flex-shrink-0 mt-1" />
                  <span>Quality education in music and dance</span>
                </li>
                <li className="flex gap-3">
                  <Zap className="w-5 h-5 text-primary-600 flex-shrink-0 mt-1" />
                  <span>Preserve classical and traditional arts</span>
                </li>
                <li className="flex gap-3">
                  <Zap className="w-5 h-5 text-primary-600 flex-shrink-0 mt-1" />
                  <span>Develop discipline and creativity</span>
                </li>
                <li className="flex gap-3">
                  <Zap className="w-5 h-5 text-primary-600 flex-shrink-0 mt-1" />
                  <span>Provide performance opportunities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-center mb-8 sm:mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: <Users className="w-12 h-12 text-primary-600" />,
                title: 'Experienced Faculty',
                description: 'Learn from accomplished musicians and dancers',
              },
              {
                icon: <Award className="w-12 h-12 text-primary-600" />,
                title: 'Traditional Training',
                description: 'Authentic classical and traditional techniques',
              },
              {
                icon: <Music className="w-12 h-12 text-primary-600" />,
                title: 'Practical Performance',
                description: 'Regular opportunities for stage performance',
              },
              {
                icon: <Users className="w-12 h-12 text-primary-600" />,
                title: 'Cultural Exposure',
                description: 'Deep connection with Indian heritage',
              },
              {
                icon: <Award className="w-12 h-12 text-primary-600" />,
                title: 'Student Development',
                description: 'Holistic growth and skill development',
              },
              {
                icon: <Music className="w-12 h-12 text-primary-600" />,
                title: 'Regular Events',
                description: 'Frequent workshops and cultural programs',
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 sm:p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4">Ready to Begin Your Journey?</h2>
          <p className="text-base sm:text-lg mb-6 sm:mb-8 text-primary-50">
            Join our academy and discover your artistic potential.
          </p>
          <Link to="/contact" className="btn-primary bg-white text-primary-600 hover:bg-gray-100 inline-block">
            Get Started Today
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
};
