import { Role } from '@/types';

export interface AuthData {
  role: Role;
  email: string;
  userId: string;
}
