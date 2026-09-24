import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { studentSchema } from '../../schemas/studentSchema';
import type { StudentFormValues } from '../../schemas/studentSchema';
import type { Student } from '../../types';
import { Input, Select } from '../ui/Input';
import { Button } from '../ui/Button';
import { calculateAge } from '../../utils/helpers';

interface StudentFormProps {
  initialData?: Student | null;
  onSubmit: (values: StudentFormValues, age: number) => Promise<void>;
  onClose: () => void;
  isSaving: boolean;
}

const defaultValues: StudentFormValues = {
  fullName: '',
  gender: 'Male',
  dateOfBirth: '',
  phone: '',
  email: '',
  address: '',
  category: 'MUSIC',
  domain: '',
  courseName: '',
  joiningDate: '',
  batch: 'Morning',
  monthlyFee: 0,
  totalFee: 0,
  status: 'ACTIVE',
  remarks: '',
};

export const StudentForm: React.FC<StudentFormProps> = ({
  initialData,
  onSubmit,
  onClose,
  isSaving,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues,
  });

  useEffect(() => {
    if (initialData) {
      reset({
        fullName: initialData.fullName,
        gender: (initialData.gender as StudentFormValues['gender']) || 'Male',
        dateOfBirth: initialData.dateOfBirth,
        phone: initialData.phone,
        email: initialData.email,
        address: initialData.address,
        category: initialData.category,
        domain: initialData.domain,
        courseName: initialData.courseName,
        joiningDate: initialData.joiningDate,
        batch: initialData.batch,
        monthlyFee: initialData.monthlyFee,
        totalFee: initialData.totalFee,
        status: initialData.status,
        remarks: initialData.remarks,
      });
    } else {
      reset(defaultValues);
    }
  }, [initialData, reset]);

  const dob = watch('dateOfBirth');

  const submit = handleSubmit(async (values) => {
    const age = values.dateOfBirth ? calculateAge(values.dateOfBirth) : 0;
    await onSubmit(values, age);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl my-8">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white rounded-t-lg">
          <h2 className="text-lg font-semibold text-gray-900">
            {initialData ? 'Edit Student' : 'Add Student'}
          </h2>
          <button onClick={onClose} className="p-1 text-gray-500 hover:text-gray-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={submit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name *"
              {...register('fullName')}
              error={errors.fullName?.message}
            />
            <Select
              label="Gender *"
              options={[
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' },
                { value: 'Other', label: 'Other' },
              ]}
              {...register('gender')}
              error={errors.gender?.message}
            />
            <Input
              label="Date of Birth *"
              type="date"
              {...register('dateOfBirth')}
              error={errors.dateOfBirth?.message}
            />
            <Input
              label="Age"
              value={dob ? String(calculateAge(dob)) : ''}
              readOnly
              disabled
            />
            <Input
              label="Phone *"
              {...register('phone')}
              error={errors.phone?.message}
            />
            <Input
              label="Email"
              type="email"
              {...register('email')}
              error={errors.email?.message}
            />
          </div>

          <Input
            label="Address *"
            {...register('address')}
            error={errors.address?.message}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Category *"
              options={[
                { value: 'MUSIC', label: 'Music' },
                { value: 'DANCE', label: 'Dance' },
              ]}
              {...register('category')}
              error={errors.category?.message}
            />
            <Input
              label="Domain *"
              placeholder="e.g. Vocal, Tabla, Kathak"
              {...register('domain')}
              error={errors.domain?.message}
            />
            <Input
              label="Course Name *"
              {...register('courseName')}
              error={errors.courseName?.message}
            />
            <Select
              label="Batch *"
              options={[
                { value: 'Morning', label: 'Morning' },
                { value: 'Afternoon', label: 'Afternoon' },
                { value: 'Evening', label: 'Evening' },
              ]}
              {...register('batch')}
              error={errors.batch?.message}
            />
            <Input
              label="Joining Date *"
              type="date"
              {...register('joiningDate')}
              error={errors.joiningDate?.message}
            />
            <Select
              label="Status *"
              options={[
                { value: 'ACTIVE', label: 'Active' },
                { value: 'INACTIVE', label: 'Inactive' },
                { value: 'GRADUATED', label: 'Graduated' },
              ]}
              {...register('status')}
              error={errors.status?.message}
            />
            <Input
              label="Monthly Fee (INR) *"
              type="number"
              {...register('monthlyFee', { valueAsNumber: true })}
              error={errors.monthlyFee?.message}
            />
            <Input
              label="Total Fee (INR) *"
              type="number"
              {...register('totalFee', { valueAsNumber: true })}
              error={errors.totalFee?.message}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Remarks
            </label>
            <textarea
              {...register('remarks')}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={onClose} disabled={isSaving}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isSaving}>
              {initialData ? 'Save Changes' : 'Add Student'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
