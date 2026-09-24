// User Types
export type UserRole = 'ADMIN' | 'OPS_USER' | 'USER';

export interface User {
  uid: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: Date;
  updatedAt: Date;
}

// Student Types
export type Category = 'MUSIC' | 'DANCE';
export type StudentStatus = 'ACTIVE' | 'INACTIVE' | 'GRADUATED';
export type PaymentStatus = 'PAID' | 'PARTIAL' | 'DUE' | 'OVERDUE';
export type Batch = 'Morning' | 'Afternoon' | 'Evening';

export interface Student {
  id: string;
  studentId: string;
  fullName: string;
  gender: string;
  dateOfBirth: string;
  age: number;
  phone: string;
  email: string;
  address: string;
  category: Category;
  domain: string;
  courseId: string;
  courseName: string;
  joiningDate: string;
  batch: Batch;
  facultyId: string;
  monthlyFee: number;
  totalFee: number;
  userId: string | null;
  status: StudentStatus;
  remarks: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

// Course Types
export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Course {
  id: string;
  courseName: string;
  category: Category;
  domain: string;
  description: string;
  duration: string;
  level: CourseLevel;
  fee: number;
  facultyId: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: Date;
  updatedAt: Date;
}

// Faculty Types
export type FacultyCategory = 'MUSIC' | 'DANCE' | 'BOTH';

export interface Faculty {
  id: string;
  name: string;
  profileImage: string;
  category: FacultyCategory;
  specialization: string;
  qualification: string;
  experience: string;
  biography: string;
  contact: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: Date;
  updatedAt: Date;
}

// Payment Types
export type PaymentMethod = 'CASH' | 'UPI' | 'BANK_TRANSFER' | 'CARD' | 'OTHER';

export interface Payment {
  id: string;
  studentId: string;
  paymentDate: string;
  amount: number;
  paymentMethod: PaymentMethod;
  receiptNumber: string;
  remarks: string;
  recordedBy: string;
  createdAt: Date;
}

// Achievement Types
export type AchievementCategory = 'MUSIC' | 'DANCE' | 'GENERAL';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  year: number;
  category: AchievementCategory;
  image: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: Date;
  updatedAt: Date;
}

// Gallery Types
export type GalleryCategory = 'Music' | 'Dance' | 'Events' | 'Performances' | 'Classes' | 'Cultural Programs' | 'Awards' | 'Other';

export interface GalleryImage {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: GalleryCategory;
  uploadedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// Website Content Types
export interface WebsiteContent {
  id: string;
  section: string;
  title: string;
  description: string;
  images: string[];
  data: Record<string, unknown>;
  updatedAt: Date;
  updatedBy: string;
}

// Contact Inquiry Types
export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  interestedCategory: Category;
  interestedCourse: string;
  message: string;
  status: 'NEW' | 'REPLIED' | 'CLOSED';
  createdAt: Date;
  repliedAt?: Date;
}

// Auth Types
export interface AuthContextType {
  user: User | null;
  userProfile: Record<string, unknown> | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
