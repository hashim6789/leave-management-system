import Layout from "@/pages/Layout";
import ProtectedRoute from "./ProtectedRoute";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminScheduleManagement from "@/pages/AdminWorkScheduleManagemnt";

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
            ],
          },
        ],
      },
    ],
  },
];
