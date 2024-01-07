import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthLayout } from '../view/layouts/AuthLayout';
import { Dashboard } from '../view/pages/Dashboard';
import { Login } from '../view/pages/Login';
import { Register } from '../view/pages/Register';
import { AuthGuard } from './auth';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Private routes */}
        <Route element={<AuthGuard />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
