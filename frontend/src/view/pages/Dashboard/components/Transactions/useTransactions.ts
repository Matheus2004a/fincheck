import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Transaction } from '../../../../../app/entities/Transaction';
import useTransaction from '../../../../../app/hooks/useTransaction';
import { TransactionFilters } from '../../../../../app/services/TransactionService';
import useDashboard from '../../contexts/useDashboard';
import useLanguage from '../../../../../app/hooks/useLanguage';

export default function useTransactions() {
  const { isVisibleValues } = useDashboard();

  const isFirstRender = useRef(true);

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [transactionEdited, setTransactionEdited] = useState<Transaction | null>(null);

  const [filters, setFilters] = useState<TransactionFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const { transactions, isLoading, refetchTransactions } = useTransaction(filters);

  const { currentLanguage } = useLanguage();
  const { t } = useTranslation();

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    refetchTransactions();
  }, [filters, refetchTransactions]);

  function handleChangeFilters<TFilter extends keyof TransactionFilters>(filter: TFilter) {
    return (value: TransactionFilters[TFilter]) => {
      if (value === filters[filter]) return;

      setFilters((prevState) => ({
        ...prevState,
        [filter]: value,
      }));
    };
  }

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  function handleApplyFilters({
    bankAccountId,
    year,
  }: { bankAccountId: string | undefined, year: number }) {
    handleChangeFilters('bankAccountId')(bankAccountId);
    handleChangeFilters('year')(year);
    handleCloseFiltersModal();
  }

  function handleOpenEditModal(transaction: Transaction) {
    setIsEditModalOpen(true);
    setTransactionEdited(transaction);
  }

  function handleCloseEditModal() {
    setIsEditModalOpen(false);
    setTransactionEdited(null);
  }

  return {
    isVisibleValues,
    isLoading,
    transactions,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    handleChangeFilters,
    handleApplyFilters,
    filters,
    isEditModalOpen,
    transactionEdited,
    handleOpenEditModal,
    handleCloseEditModal,
    currentLanguage,
    t,
  };
}
