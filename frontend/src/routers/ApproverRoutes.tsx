import Layout from "@/pages/Layout";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "@/pages/approver/Dashboard";
export const ApproverRoutes = () => [
  {
    path: "/approver",
    children: [
      {
        element: <ProtectedRoute role="approver" />,
        children: [
          {
            element: <Layout role="approver" />,
            children: [
              { path: "dashboard", element: <Dashboard /> },
              { path: "work-schedules", element: <Dashboard /> },
              { path: "users", element: <Dashboard /> },
              { path: "groups", element: <Dashboard /> },
            ],
          },
        ],
      },
    ],
  },
];
