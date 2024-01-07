import { Navigate, Outlet } from "react-router-dom";

export function AuthGuard() {
  const signedIn = false;

  if (!signedIn) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
