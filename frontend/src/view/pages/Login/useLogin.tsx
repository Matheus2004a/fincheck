import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import z from 'zod';
import useAuth from '../../../app/hooks/useAuth';
import AuthService, { SigninParams } from '../../../app/services/AuthService';

const schemaLogin = z.object({
  email: z.string().min(1, 'Insira seu e-mail para entrar').email('Email inválido'),
  password: z.string().min(8, 'A senha deve ter 8 digítos'),
});

type FormData = z.infer<typeof schemaLogin>

export default function useLogin() {
  const {
    register, handleSubmit: hookFormSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schemaLogin),
  });

  const { signin } = useAuth();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: SigninParams) => AuthService.signin(data),
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);

      signin(accessToken);
    } catch (error: any) {
      toast.error(error.message);
    }
  });

  return {
    register, handleSubmit, errors, isLoading,
  };
}
