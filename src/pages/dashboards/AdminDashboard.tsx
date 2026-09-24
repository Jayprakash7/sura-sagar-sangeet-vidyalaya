import React from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { StatCard, Card } from '../../components/ui/Card';
import {
  GraduationCap,
  Music,
  Activity,
  BookOpen,
  UserCog,
  IndianRupee,
} from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

// Placeholder metrics — wired to live services in a later phase.
const stats = {
  totalStudents: 0,
  musicStudents: 0,
  danceStudents: 0,
  activeStudents: 0,
  totalCourses: 0,
  musicCourses: 0,
  danceCourses: 0,
  totalFaculty: 0,
  totalFees: 0,
  collectedFees: 0,
  outstandingFees: 0,
};

const categoryData = [
  { name: 'Music', value: stats.musicStudents },
  { name: 'Dance', value: stats.danceStudents },
];

const feeData = [
  { name: 'Total', amount: stats.totalFees },
  { name: 'Collected', amount: stats.collectedFees },
  { name: 'Outstanding', amount: stats.outstandingFees },
];

const COLORS = ['#c2703d', '#8b5cf6'];

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500">Overview of the vidyalaya operations</p>
      </div>

      {/* Student stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Students" value={stats.totalStudents} icon={<GraduationCap className="w-6 h-6" />} accent="primary" />
        <StatCard title="Music Students" value={stats.musicStudents} icon={<Music className="w-6 h-6" />} accent="amber" />
        <StatCard title="Dance Students" value={stats.danceStudents} icon={<Activity className="w-6 h-6" />} accent="secondary" />
        <StatCard title="Active Students" value={stats.activeStudents} icon={<Activity className="w-6 h-6" />} accent="green" />
      </div>

      {/* Course & faculty stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Courses" value={stats.totalCourses} icon={<BookOpen className="w-6 h-6" />} accent="blue" />
        <StatCard title="Music Courses" value={stats.musicCourses} icon={<BookOpen className="w-6 h-6" />} accent="amber" />
        <StatCard title="Dance Courses" value={stats.danceCourses} icon={<BookOpen className="w-6 h-6" />} accent="secondary" />
        <StatCard title="Total Faculty" value={stats.totalFaculty} icon={<UserCog className="w-6 h-6" />} accent="primary" />
      </div>

      {/* Fee stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Fees" value={formatCurrency(stats.totalFees)} icon={<IndianRupee className="w-6 h-6" />} accent="blue" />
        <StatCard title="Collected" value={formatCurrency(stats.collectedFees)} icon={<IndianRupee className="w-6 h-6" />} accent="green" />
        <StatCard title="Outstanding" value={formatCurrency(stats.outstandingFees)} icon={<IndianRupee className="w-6 h-6" />} accent="red" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Students by Category</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                {categoryData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Fee Overview</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={feeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(v) => formatCurrency(Number(v))} />
              <Bar dataKey="amount" fill="#c2703d" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};
