export type Role = 'admin' | 'manager' | 'employee';

export interface User {
  _id: string;
  email: string;
  password: string;
  role: Role;
  isBlocked: boolean;
  username: string;
  createdAt: Date;
  updatedAt: Date;
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
