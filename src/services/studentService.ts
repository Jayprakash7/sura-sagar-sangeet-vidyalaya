import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import type { Student, Category, StudentStatus } from '../types';

const STUDENTS_COLLECTION = 'students';

type StudentInput = Omit<
  Student,
  'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'
>;

interface FirestoreTimestamp {
  toDate: () => Date;
}

const mapStudent = (
  id: string,
  data: Record<string, unknown>
): Student => ({
  id,
  studentId: (data.studentId as string) ?? '',
  fullName: (data.fullName as string) ?? '',
  gender: (data.gender as string) ?? '',
  dateOfBirth: (data.dateOfBirth as string) ?? '',
  age: (data.age as number) ?? 0,
  phone: (data.phone as string) ?? '',
  email: (data.email as string) ?? '',
  address: (data.address as string) ?? '',
  category: (data.category as Category) ?? 'MUSIC',
  domain: (data.domain as string) ?? '',
  courseId: (data.courseId as string) ?? '',
  courseName: (data.courseName as string) ?? '',
  joiningDate: (data.joiningDate as string) ?? '',
  batch: (data.batch as Student['batch']) ?? 'Morning',
  facultyId: (data.facultyId as string) ?? '',
  monthlyFee: (data.monthlyFee as number) ?? 0,
  totalFee: (data.totalFee as number) ?? 0,
  userId: (data.userId as string | null) ?? null,
  status: (data.status as StudentStatus) ?? 'ACTIVE',
  remarks: (data.remarks as string) ?? '',
  createdAt: (data.createdAt as FirestoreTimestamp)?.toDate?.() ?? new Date(),
  updatedAt: (data.updatedAt as FirestoreTimestamp)?.toDate?.() ?? new Date(),
  createdBy: (data.createdBy as string) ?? '',
  updatedBy: (data.updatedBy as string) ?? '',
});

export const studentService = {
  /** Get all students, most recently created first */
  async getAll(): Promise<Student[]> {
    const q = query(
      collection(db, STUDENTS_COLLECTION),
      orderBy('createdAt', 'desc')
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => mapStudent(d.id, d.data()));
  },

  /** Get students filtered by category */
  async getByCategory(category: Category): Promise<Student[]> {
    const q = query(
      collection(db, STUDENTS_COLLECTION),
      where('category', '==', category)
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => mapStudent(d.id, d.data()));
  },

  /** Get a single student by document id */
  async getById(id: string): Promise<Student | null> {
    const snap = await getDoc(doc(db, STUDENTS_COLLECTION, id));
    if (!snap.exists()) return null;
    return mapStudent(snap.id, snap.data());
  },

  /** Create a new student. Returns the new document id. */
  async create(data: StudentInput, createdBy: string): Promise<string> {
    const ref = await addDoc(collection(db, STUDENTS_COLLECTION), {
      ...data,
      createdBy,
      updatedBy: createdBy,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return ref.id;
  },

  /** Update an existing student */
  async update(
    id: string,
    data: Partial<StudentInput>,
    updatedBy: string
  ): Promise<void> {
    await updateDoc(doc(db, STUDENTS_COLLECTION, id), {
      ...data,
      updatedBy,
      updatedAt: serverTimestamp(),
    });
  },

  /** Delete a student */
  async remove(id: string): Promise<void> {
    await deleteDoc(doc(db, STUDENTS_COLLECTION, id));
  },
};
