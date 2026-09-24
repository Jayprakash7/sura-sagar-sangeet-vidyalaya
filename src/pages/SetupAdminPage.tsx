import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { PublicLayout } from '../layouts/PublicLayout';
import { AlertCircle, CheckCircle, ShieldAlert } from 'lucide-react';

/**
 * ONE-TIME ADMIN SETUP PAGE
 * Use this once to create your first ADMIN account.
 * After creating the admin, this route should be removed for security.
 */
export const SetupAdminPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Create the Firebase Authentication user
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = credential.user.uid;

      // 2. Create the Firestore user profile with ADMIN role
      await setDoc(doc(db, 'users', uid), {
        uid,
        name,
        email,
        phone,
        role: 'ADMIN',
        status: 'ACTIVE',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message.includes('email-already-in-use')) {
          setError('This email is already registered.');
        } else if (err.message.includes('weak-password')) {
          setError('Password should be at least 6 characters.');
        } else if (err.message.includes('invalid-email')) {
          setError('Please enter a valid email address.');
        } else {
          setError(err.message);
        }
      } else {
        setError('Failed to create admin account.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <section className="section-padding bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
            <div className="flex items-center gap-2 justify-center mb-2 text-primary-600">
              <ShieldAlert className="w-6 h-6" />
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-center">
                Admin Setup
              </h1>
            </div>
            <p className="text-gray-600 text-center text-sm mb-6">
              Create the first administrator account. Remove this page after use.
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="text-green-700 text-sm">
                  Admin created successfully! Redirecting to dashboard...
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition"
                  placeholder="Enter full name"
                  disabled={loading || success}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition"
                  placeholder="admin@example.com"
                  disabled={loading || success}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition"
                  placeholder="9876543210"
                  disabled={loading || success}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition"
                  placeholder="At least 6 characters"
                  disabled={loading || success}
                />
              </div>

              <button
                type="submit"
                disabled={loading || success}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Admin...' : 'Create Admin Account'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};
