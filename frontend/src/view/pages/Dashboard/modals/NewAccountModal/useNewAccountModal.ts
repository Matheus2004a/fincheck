import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { bankAccounts } from '../../../../../app/services/bankAccounts';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';
import useDashboard from '../../contexts/useDashboard';

const schema = z.object({
  name: z.string().min(1, 'Nome da conta é obrigatório'),
  initialBalance: z.string().min(1, 'Saldo inicial é obrigatório'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
  color: z.string().min(1, 'Cor da conta é obrigatória'),
});

type FormData = z.infer<typeof schema>;

export default function useNewAccountModal() {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { isLoading, mutateAsync } = useMutation(bankAccounts.create, {
    onSuccess: () => {
      toast.success('Conta criada com sucesso');
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
