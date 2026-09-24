import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import type { User, UserRole } from '../types';

const USERS_COLLECTION = 'users';

interface FirestoreUserData {
  uid: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt?: { toDate: () => Date };
  updatedAt?: { toDate: () => Date };
}

const mapUser = (id: string, data: FirestoreUserData): User => ({
  uid: id,
  name: data.name,
  email: data.email,
  phone: data.phone,
  role: data.role,
  status: data.status,
  createdAt: data.createdAt?.toDate() ?? new Date(),
  updatedAt: data.updatedAt?.toDate() ?? new Date(),
});

export const userService = {
  /** Get a single user profile by UID */
  async getById(uid: string): Promise<User | null> {
    const snap = await getDoc(doc(db, USERS_COLLECTION, uid));
    if (!snap.exists()) return null;
    return mapUser(snap.id, snap.data() as FirestoreUserData);
  },

  /** Get all users (ADMIN only per security rules) */
  async getAll(): Promise<User[]> {
    const q = query(collection(db, USERS_COLLECTION), orderBy('name'));
    const snap = await getDocs(q);
    return snap.docs.map((d) => mapUser(d.id, d.data() as FirestoreUserData));
  },

  /** Get users filtered by role */
  async getByRole(role: UserRole): Promise<User[]> {
    const q = query(
      collection(db, USERS_COLLECTION),
      where('role', '==', role)
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => mapUser(d.id, d.data() as FirestoreUserData));
  },

  /** Create a user profile document (auth account created separately) */
  async create(
    uid: string,
    data: Omit<User, 'uid' | 'createdAt' | 'updatedAt'>
  ): Promise<void> {
    await setDoc(doc(db, USERS_COLLECTION, uid), {
      uid,
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  },

  /** Update a user profile */
  async update(
    uid: string,
    data: Partial<Omit<User, 'uid' | 'createdAt'>>
  ): Promise<void> {
    await updateDoc(doc(db, USERS_COLLECTION, uid), {
      ...data,
      updatedAt: serverTimestamp(),
    });
  },

  /** Change a user's role (ADMIN only) */
  async updateRole(uid: string, role: UserRole): Promise<void> {
    await updateDoc(doc(db, USERS_COLLECTION, uid), {
      role,
      updatedAt: serverTimestamp(),
    });
  },

  /** Activate or deactivate a user */
  async setStatus(uid: string, status: 'ACTIVE' | 'INACTIVE'): Promise<void> {
    await updateDoc(doc(db, USERS_COLLECTION, uid), {
      status,
      updatedAt: serverTimestamp(),
    });
  },

  /** Delete a user profile document */
  async remove(uid: string): Promise<void> {
    await deleteDoc(doc(db, USERS_COLLECTION, uid));
  },
};
