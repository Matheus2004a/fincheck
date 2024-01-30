import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import BankAccountService from '../../../../../app/services/BankAccountService';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';
import { FormData, schemaAccounts } from '../../../../../app/validations/schemaAccounts';
import useDashboard from '../../contexts/useDashboard';

export default function useNewAccountModal() {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schemaAccounts),
  });

  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const { isLoading, mutateAsync } = useMutation(BankAccountService.create, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      toast.success(t('toast.accountSuccessCreated'));
      closeNewAccountModal();
      reset();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao cadastrar conta');
    },
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    await mutateAsync({
      ...data,
      initialBalance: currencyStringToNumber(data.initialBalance),
    });
  });

  return {
    isNewAccountModalOpen,
    closeNewAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isLoading,
  };
}
