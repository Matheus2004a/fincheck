import { useContext } from 'react';
import { DashboardContext } from './DashboardContext';

export default function useDashboard() {
  return useContext(DashboardContext);
}
