import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../types';

export const useAuthUser = () => {
  return useAuth();
};

export const useUserRole = (): UserRole | null => {
  const { user } = useAuth();
  return user?.role || null;
};

export const useHasRole = (requiredRoles: UserRole | UserRole[]) => {
  const { user } = useAuth();
  if (!user) return false;
  
  const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
  return roles.includes(user.role);
};
