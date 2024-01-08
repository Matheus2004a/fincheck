import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import authService from '../../../app/services/AuthService';

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

  const handleSubmit = hookFormSubmit(async (data) => {
    const { accessToken } = await authService.signup(data);

    console.log({ accessToken });
  });

  return { register, handleSubmit, errors };
}
