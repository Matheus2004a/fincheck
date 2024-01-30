import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import BankAccountService from '../../../../../app/services/BankAccountService';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';
import { FormData, schemaAccounts } from '../../../../../app/validations/schemaAccounts';
import useDashboard from '../../contexts/useDashboard';

export default function useEditAccountModal() {
  const { isEditAccountModalOpen, closeEditAccountModal, accountBeingEdited } = useDashboard();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schemaAccounts),
    defaultValues: {
      color: accountBeingEdited?.color,
      initialBalance: accountBeingEdited?.initialBalance,
      name: accountBeingEdited?.name,
      type: accountBeingEdited?.type,
    },
  });

  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const { isLoading, mutateAsync: updateAccount } = useMutation(BankAccountService.update, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      toast.success(t('toast.accountSuccessEdited'));
      closeEditAccountModal();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao editar conta');
    },
  });

  const {
    isLoading: isLoadingDelete, mutateAsync: removeAccount,
  } = useMutation(BankAccountService.remove, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast.success(t('toast.accountSuccessDeleted'));
      closeEditAccountModal();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao remover conta');
    },
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    await updateAccount({
      ...data,
      initialBalance: currencyStringToNumber(data.initialBalance),
      id: accountBeingEdited?.id,
    });
  });

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  async function handleDeleteAccount() {
    await removeAccount(accountBeingEdited!.id);
  }

  return {
    isEditAccountModalOpen,
    closeEditAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isLoading,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    isLoadingDelete,
    handleDeleteAccount,
  };
}
