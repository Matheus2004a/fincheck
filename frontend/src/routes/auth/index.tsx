import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../app/hooks/useAuth';

export function AuthGuard() {
  const { signedIn } = useAuth();

  if (!signedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
