import { z } from 'zod';

export const studentSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  gender: z.enum(['Male', 'Female', 'Other'], {
    message: 'Select a gender',
  }),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  phone: z
    .string()
    .regex(/^[0-9]{10}$/, 'Enter a valid 10-digit phone number'),
  email: z
    .string()
    .email('Enter a valid email')
    .or(z.literal(''))
    .optional(),
  address: z.string().min(1, 'Address is required'),
  category: z.enum(['MUSIC', 'DANCE'], { message: 'Select a category' }),
  domain: z.string().min(1, 'Domain is required'),
  courseName: z.string().min(1, 'Course name is required'),
  joiningDate: z.string().min(1, 'Joining date is required'),
  batch: z.enum(['Morning', 'Afternoon', 'Evening'], {
    message: 'Select a batch',
  }),
  monthlyFee: z
    .number({ message: 'Enter a valid amount' })
    .min(0, 'Monthly fee must be 0 or more'),
  totalFee: z
    .number({ message: 'Enter a valid amount' })
    .min(0, 'Total fee must be 0 or more'),
  status: z.enum(['ACTIVE', 'INACTIVE', 'GRADUATED']),
  remarks: z.string().optional(),
});

export type StudentFormValues = z.infer<typeof studentSchema>;
