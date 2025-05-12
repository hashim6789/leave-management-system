import Layout from "@/pages/Layout";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "@/pages/employee/Dashboard";
import AttendanceManagement from "@/pages/employee/AttendanceManagement";
export const EmployeeRoutes = () => [
  {
    path: "/employee",
    children: [
      {
        element: <ProtectedRoute role="employee" />,
        children: [
          {
            element: <Layout role="employee" />,
            children: [
              { path: "dashboard", element: <Dashboard /> },
              { path: "attendance", element: <AttendanceManagement /> },
              { path: "leaves", element: <Dashboard /> },
              { path: "reports", element: <Dashboard /> },
            ],
          },
        ],
      },
    ],
  },
];
