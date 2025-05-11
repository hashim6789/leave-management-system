import type { Group } from "./group";

export type Role = "admin" | "approver" | "employee";

export interface User {
  _id: string;
  username: string;
  email: string;
  role: Role;
  isBlocked: boolean;
  group?: Group;
  groupId: string;
}
