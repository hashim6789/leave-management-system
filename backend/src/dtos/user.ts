import { Role, User } from '@/types';

export interface AuthData {
  role: Role;
  email: string;
  userId: string;
}

export type ICreateUserDTO = Omit<User, '_id' | 'createdAt' | 'updatedAt' | 'password'>;
