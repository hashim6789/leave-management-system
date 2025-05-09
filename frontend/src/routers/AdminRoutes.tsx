import ProtectedRoute from "./ProtectedRoute";

export const AdminRoutes = () => [
  {
    path: "/admin",
    children: [
      {
        element: <ProtectedRoute role="admin" />,
        children: [
          // {
          //   element: <Layout />,
          //   children: [],
          // },
        ],
      },
    ],
  },
];
