import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import BankAccountService from '../../../../../app/services/BankAccountService';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';
import { schema } from '../../../../../app/validations/schemaAccounts';
import useDashboard from '../../contexts/useDashboard';

type FormData = z.infer<typeof schema>;

export default function useEditAccountModal() {
  const { isEditAccountModalOpen, closeEditAccountModal, accountBeingEdited } = useDashboard();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      color: accountBeingEdited?.color,
      initialBalance: accountBeingEdited?.initialBalance,
      name: accountBeingEdited?.name,
      type: accountBeingEdited?.type,
    },
  });

  const queryClient = useQueryClient();

  const { isLoading, mutateAsync } = useMutation(BankAccountService.update, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      toast.success('Conta editada com sucesso');
      closeEditAccountModal();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao editar conta');
    },
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    await mutateAsync({
      ...data,
      initialBalance: currencyStringToNumber(data.initialBalance),
      id: accountBeingEdited?.id,
    });
  });

  return {
    isEditAccountModalOpen,
    closeEditAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isLoading,
  };
}
