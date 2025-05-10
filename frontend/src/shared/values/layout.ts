import { PieChart, Lightbulb, GraduationCap, Bookmark } from "lucide-react";
import { BarChart, Calendar, Home, MessageSquare, Users } from "lucide-react";
import { SidebarContent } from "../../../types";

export const mentorSidebarItems: SidebarContent[] = [
  { path: "/mentor/dashboard", name: "Dashboard", icon: Home },
  { path: "/mentor/courses", name: "Courses", icon: Users },
  { path: "/mentor/meetings", name: "Meetings", icon: Calendar },
  { path: "/mentor/chats", name: "Chat Groups", icon: MessageSquare },
  { path: "/mentor/earnings", name: "Earnings", icon: BarChart },
];

export const AdminSidebarItems: SidebarContent[] = [
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    icon: PieChart,
  },
  {
    path: "/admin/learners",
    name: "Learners",
    icon: Users,
  },
  {
    path: "/admin/mentors",
    name: "Mentors",
    icon: Lightbulb,
  },
  {
    path: "/admin/courses",
    name: "Courses",
    icon: GraduationCap,
  },
  {
    path: "/admin/categories",
    name: "Category",
    icon: Bookmark,
  },
  {
    path: "/admin/revenue",
    name: "Revenue Report",
    icon: BarChart,
  },
];
