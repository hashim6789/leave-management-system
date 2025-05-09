export type Role = "admin" | "manager" | "employee";

export interface User {
  _id: string;
  email: string;
  role: Role;
  isBlocked: boolean;
  username: string;
}
