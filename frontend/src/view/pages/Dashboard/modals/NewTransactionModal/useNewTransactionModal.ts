import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useBankAccounts from '../../../../../app/hooks/useBankAccounts';
import useCategories from '../../../../../app/hooks/useCategories';
import TransactionService from '../../../../../app/services/TransactionService';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';
import { FormData, schemaTransaction } from '../../../../../app/validations/schemaTransaction';
import useDashboard from '../../contexts/useDashboard';

export default function useNewTransactionModal() {
  const {
    isNewTransactionModalOpen, openNewTransactionModal, closeNewTransactionModal,
    newTransactionType,
  } = useDashboard();

  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();

  const categories = useMemo(() => {
    return categoriesList.filter((category) => category.type === newTransactionType);
  }, [categoriesList, newTransactionType]);

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schemaTransaction),
  });

  const queryClient = useQueryClient();

  const { isLoading, mutateAsync: createTransaction } = useMutation(TransactionService.create, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast.success(
        newTransactionType === 'INCOME'
          ? 'Receita criada com sucesso'
          : 'Despesa criada com sucesso',
      );
      closeNewTransactionModal();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao remover transação');
    },
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    await createTransaction({
      ...data,
      value: currencyStringToNumber(data.value),
      type: newTransactionType!,
      date: data.date.toISOString(),
    });
  });

  return {
    isNewTransactionModalOpen,
    openNewTransactionModal,
    closeNewTransactionModal,
    newTransactionType,
    handleSubmit,
    register,
    errors,
    control,
    accounts,
    categories,
    isLoading,
  };
}
