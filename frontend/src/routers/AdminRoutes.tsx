import Layout from "@/pages/Layout";
import ProtectedRoute from "./ProtectedRoute";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminScheduleManagement from "@/pages/admin/AdminWorkScheduleManagemnt";
import AdminUserManagement from "@/pages/admin/AdminUserManagement";
import AdminGroupManagement from "@/pages/admin/AdminGroupManagement";

export const AdminRoutes = () => [
  {
    path: "/admin",
    children: [
      {
        element: <ProtectedRoute role="admin" />,
        children: [
          {
            element: <Layout role="admin" />,
            children: [
              { path: "dashboard", element: <AdminDashboard /> },
              { path: "work-schedules", element: <AdminScheduleManagement /> },
              { path: "users", element: <AdminUserManagement /> },
              { path: "groups", element: <AdminGroupManagement /> },
            ],
          },
        ],
      },
    ],
  },
];
