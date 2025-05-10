export type Role = "admin" | "approver" | "employee";

export interface User {
  _id: string;
  email: string;
  role: Role;
  isBlocked: boolean;
  username: string;
}
