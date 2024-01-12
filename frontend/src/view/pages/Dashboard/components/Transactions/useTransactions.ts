import useDashboard from '../../contexts/useDashboard';

export default function useTransactions() {
  const { isVisibleValues } = useDashboard();

  return { isVisibleValues };
}
