import { useState } from 'react';
import useDashboard from '../../contexts/useDashboard';

export default function useTransactions() {
  const { isVisibleValues } = useDashboard();

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(true);

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  return {
    isVisibleValues,
    isLoading: false,
    transactions: [],
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
  };
}
