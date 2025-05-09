import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { AdminRoutes } from "./AdminRoutes";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { EmployeeRoutes } from "./EmployeeRoutes";
import { ManagerRoutes } from "./ManagerRoutes";
import { fetchMe } from "@/store/thunks/fetchMe";
import { AuthenticationPage } from "@/pages";
import BlockedPage from "@/pages/BlockedPage";
import ServerErrorPage from "@/pages/ServerErrorPage";
import NotFoundPage from "@/pages/NotFoundPage";

const AppRoutes: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);
  const { user } = useAppSelector().auth;

  const routes = [
    ...AdminRoutes(),
    ...EmployeeRoutes(),
    ...ManagerRoutes(),
    {
      path: "/login",
      element: user ? (
        <Navigate to={`/${user.role}/dashboard`} />
      ) : (
        <AuthenticationPage />
      ),
    },
    {
      path: "/",
      element: user ? (
        <Navigate to={`/${user.role}/dashboard`} />
      ) : (
        <AuthenticationPage />
      ),
    },

    {
      path: "/blocked",
      element: <BlockedPage />,
    },
    {
      path: "/500",
      element: <ServerErrorPage />,
    },
    { path: "*", element: <NotFoundPage /> },
  ];

  return useRoutes(routes);
};

export default AppRoutes;
