import { Group } from './group';

export type Role = 'admin' | 'approver' | 'employee';

export interface User {
  _id: string;
  email: string;
  password: string;
  role: Role;
  isBlocked: boolean;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  groupId?: string;
}

export type JwtPayload = {
  userId: string;
  role: Role;
  email: string;
};

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface IPopulatedUser extends User {
  group: Group;
}
