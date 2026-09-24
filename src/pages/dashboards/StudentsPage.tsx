import React, { useEffect, useState, useCallback } from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { studentService } from '../../services/studentService';
import { useAuth } from '../../context/AuthContext';
import { StudentForm } from '../../components/students/StudentForm';
import { Button } from '../../components/ui/Button';
import { Badge, EmptyState, LoadingSpinner } from '../../components/Common';
import { getFirebaseErrorMessage } from '../../utils/errors';
import { formatCurrency, generateStudentId } from '../../utils/helpers';
import type { Student, Category } from '../../types';
import type { StudentFormValues } from '../../schemas/studentSchema';

const statusVariant: Record<
  Student['status'],
  'success' | 'warning' | 'secondary'
> = {
  ACTIVE: 'success',
  INACTIVE: 'warning',
  GRADUATED: 'secondary',
};

export const StudentsPage: React.FC = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'ALL'>('ALL');

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Student | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await studentService.getAll();
      setStudents(data);
    } catch (err) {
      setError(getFirebaseErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleEdit = (student: Student) => {
    setEditing(student);
    setShowForm(true);
  };

  const handleDelete = async (student: Student) => {
    if (!window.confirm(`Delete ${student.fullName}? This cannot be undone.`)) {
      return;
    }
    try {
      await studentService.remove(student.id);
      setStudents((prev) => prev.filter((s) => s.id !== student.id));
    } catch (err) {
      setError(getFirebaseErrorMessage(err));
    }
  };

  const handleSubmit = async (values: StudentFormValues, age: number) => {
    if (!user) return;
    setSaving(true);
    setError('');
    try {
      const payload = {
        ...values,
        email: values.email ?? '',
        remarks: values.remarks ?? '',
        age,
        courseId: editing?.courseId ?? '',
        facultyId: editing?.facultyId ?? '',
        userId: editing?.userId ?? null,
      };

      if (editing) {
        await studentService.update(editing.id, payload, user.uid);
      } else {
        await studentService.create(
          { ...payload, studentId: generateStudentId() },
          user.uid
        );
      }
      setShowForm(false);
      setEditing(null);
      await load();
    } catch (err) {
      setError(getFirebaseErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const filtered = students.filter((s) => {
    const matchesSearch =
      s.fullName.toLowerCase().includes(search.toLowerCase()) ||
      s.studentId.toLowerCase().includes(search.toLowerCase()) ||
      s.phone.includes(search);
    const matchesCategory =
      categoryFilter === 'ALL' || s.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-500">{students.length} total students</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4" /> Add Student
        </Button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, ID, or phone"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as Category | 'ALL')}
          className="px-4 py-2 border border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-primary-600"
        >
          <option value="ALL">All Categories</option>
          <option value="MUSIC">Music</option>
          <option value="DANCE">Dance</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="py-16">
            <LoadingSpinner />
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            title="No students found"
            description={
              students.length === 0
                ? 'Add your first student to get started.'
                : 'Try adjusting your search or filters.'
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 text-left">
                <tr>
                  <th className="px-4 py-3 font-medium">Student ID</th>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Course</th>
                  <th className="px-4 py-3 font-medium">Batch</th>
                  <th className="px-4 py-3 font-medium">Monthly Fee</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs text-gray-700">
                      {s.studentId}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {s.fullName}
                    </td>
                    <td className="px-4 py-3">{s.category}</td>
                    <td className="px-4 py-3">{s.courseName}</td>
                    <td className="px-4 py-3">{s.batch}</td>
                    <td className="px-4 py-3">{formatCurrency(s.monthlyFee)}</td>
                    <td className="px-4 py-3">
                      <Badge label={s.status} variant={statusVariant[s.status]} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(s)}
                          className="p-1.5 text-gray-500 hover:text-primary-600"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(s)}
                          className="p-1.5 text-gray-500 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showForm && (
        <StudentForm
          initialData={editing}
          onSubmit={handleSubmit}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
          isSaving={saving}
        />
      )}
    </div>
  );
};
