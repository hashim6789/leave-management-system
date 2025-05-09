import ProtectedRoute from "./ProtectedRoute";
export const EmployeeRoutes = () => [
  {
    path: "/employee",
    children: [
      {
        element: <ProtectedRoute role="employee" />,
        children: [
          {
            // element: <Layout />,
            children: [],
          },
        ],
      },
    ],
  },
];
