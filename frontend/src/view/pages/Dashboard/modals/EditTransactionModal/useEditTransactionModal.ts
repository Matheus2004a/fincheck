import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Transaction } from '../../../../../app/entities/Transaction';
import useBankAccounts from '../../../../../app/hooks/useBankAccounts';
import useCategories from '../../../../../app/hooks/useCategories';
import TransactionService from '../../../../../app/services/TransactionService';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';
import { FormData, schemaTransaction } from '../../../../../app/validations/schemaTransaction';

export default function useEditTransactionModal(transaction: Transaction, onClose: () => void) {
  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();
  const { t } = useTranslation();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const categories = useMemo(() => {
    return categoriesList.filter((category) => category.type === transaction.type);
  }, [categoriesList, transaction]);

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schemaTransaction),
    defaultValues: {
      name: transaction.name,
      value: transaction.value,
      bankAccountId: transaction.bankAccountId,
      categoryId: transaction.categoryId,
      date: new Date(transaction.date),
    },
  });

  const queryClient = useQueryClient();

  const { isLoading, mutateAsync: updateTransaction } = useMutation(TransactionService.update, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });

      toast.success(
        transaction.type === 'INCOME'
          ? t('toast.update.success.income')
          : t('toast.update.success.expense'),
      );
      reset();
      onClose();
    },
    onError: () => {
      toast.error(transaction.type === 'INCOME'
        ? t('toast.update.error.income')
        : t('toast.update.error.expense'));
    },
  });

  const {
    isLoading: isLoadingDelete, mutateAsync: removeTransaction,
  } = useMutation(TransactionService.remove, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });

      toast.success(
        transaction.type === 'INCOME'
          ? t('toast.remove.success.income')
          : t('toast.remove.success.expense'),
      );
      onClose();
    },
    onError: () => {
      toast.error(transaction.type === 'INCOME'
        ? t('toast.remove.error.income')
        : t('toast.remove.error.expense'));
    },
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    await updateTransaction({
      ...data,
      id: transaction.id,
      value: currencyStringToNumber(data.value),
      type: transaction.type,
      date: data.date.toISOString(),
    });
  });

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  async function handleDeleteTransaction() {
    await removeTransaction(transaction.id);
  }

  return {
    handleSubmit,
    register,
    errors,
    control,
    accounts,
    categories,
    isLoading,
    isDeleteModalOpen,
    isLoadingDelete,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteTransaction,
    t,
  };
}
