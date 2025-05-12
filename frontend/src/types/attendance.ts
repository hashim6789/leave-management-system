export interface Attendance {
  _id?: string;
  userId: string;
  groupId: string;
  workScheduleId: string;
  checkInTime: string;
  checkOutTime?: string;
  status: "checked-in" | "checked-out";
  approvalStatus?: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
}
