import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import z from 'zod';
import useAuth from '../../../app/hooks/useAuth';
import AuthService, { SignupParams } from '../../../app/services/AuthService';

const schemaRegister = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().min(1, 'Insira seu e-mail para entrar').email('Email inválido'),
  password: z.string().min(8, 'A senha deve ter 8 digítos'),
});

type FormData = z.infer<typeof schemaRegister>

export default function useRegister() {
  const {
    register, handleSubmit: hookFormSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schemaRegister),
  });

  const { signin } = useAuth();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: SignupParams) => AuthService.signup(data),
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    const { accessToken } = await mutateAsync(data);

    signin(accessToken);
  });

  return {
    register, handleSubmit, errors, isLoading,
  };
}
