import type { SidebarContent } from "@/types";
import { PieChart } from "lucide-react";
import { BarChart, Calendar, Home, MessageSquare, Users } from "lucide-react";

export const approverSidebarItems: SidebarContent[] = [
  { path: "/mentor/dashboard", name: "Dashboard", icon: Home },
  { path: "/mentor/courses", name: "Courses", icon: Users },
  { path: "/mentor/meetings", name: "Meetings", icon: Calendar },
  { path: "/mentor/chats", name: "Chat Groups", icon: MessageSquare },
  { path: "/mentor/earnings", name: "Earnings", icon: BarChart },
];

export const employeeSidebarItems: SidebarContent[] = [
  { path: "/employee/dashboard", name: "Dashboard", icon: Home },
  { path: "/employee/attendance", name: "Attendance", icon: Calendar },
  { path: "/employee/leaves", name: "Leaves", icon: MessageSquare },
  { path: "/employee/earnings", name: "Reports", icon: BarChart },
];

export const AdminSidebarItems: SidebarContent[] = [
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    icon: PieChart,
  },
  {
    path: "/admin/work-schedules",
    name: "Work Schedules",
    icon: Users,
  },
  {
    path: "/admin/groups",
    name: "User Groups",
    icon: Users,
  },
  {
    path: "/admin/users",
    name: "Users",
    icon: Users,
  },
  // {
  //   path: "/admin/mentors",
  //   name: "Mentors",
  //   icon: Lightbulb,
  // },
  // {
  //   path: "/admin/courses",
  //   name: "Courses",
  //   icon: GraduationCap,
  // },
  // {
  //   path: "/admin/categories",
  //   name: "Category",
  //   icon: Bookmark,
  // },
  // {
  //   path: "/admin/revenue",
  //   name: "Revenue Report",
  //   icon: BarChart,
  // },
];
