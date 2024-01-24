import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Transaction } from '../../../../../app/entities/Transaction';
import useBankAccounts from '../../../../../app/hooks/useBankAccounts';
import useCategories from '../../../../../app/hooks/useCategories';
import TransactionService from '../../../../../app/services/TransactionService';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';
import { FormData, schemaTransaction } from '../../../../../app/validations/schemaTransaction';

export default function useEditTransactionModal(transaction: Transaction, onClose: () => void) {
  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();

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
      toast.success(
        transaction.type === 'INCOME'
          ? 'Receita editada com sucesso'
          : 'Despesa editada com sucesso',
      );
      reset();
      onClose();
    },
    onError: () => {
      toast.error(transaction.type === 'INCOME'
        ? 'Erro ao atualizar receita'
        : 'Erro ao atualizar despesa');
    },
  });

  const {
    isLoading: isLoadingDelete, mutateAsync: removeTransaction,
  } = useMutation(TransactionService.remove, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast.success(
        transaction.type === 'INCOME'
          ? 'Receita removida com sucesso'
          : 'Despesa removida com sucesso',
      );
      onClose();
    },
    onError: () => {
      toast.error(transaction.type === 'INCOME'
        ? 'Erro ao deletar receita'
        : 'Erro ao deletar despesa');
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
  };
}
