import ProtectedRoute from "./ProtectedRoute";
export const ManagerRoutes = () => [
  {
    path: "/manager",
    children: [
      {
        element: <ProtectedRoute role="manager" />,
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
