import { useState } from 'react';
import useTransaction from '../../../../../app/hooks/useTransaction';
import useDashboard from '../../contexts/useDashboard';

export default function useTransactions() {
  const { isVisibleValues } = useDashboard();

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  const { transactions, isLoading } = useTransaction();

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  return {
    isVisibleValues,
    isLoading,
    transactions,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
  };
}
