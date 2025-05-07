import { FC } from "react";
import { Navigate, Outlet } from "react-router";
import { useCtxUser } from "../hooks/useCtxUser";

export const RequireAuth: FC = () => {
  const { isAuthenticated } = useCtxUser();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
