import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

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

  const handleSubmit = hookFormSubmit(async (data) => {
    console.log({ data });
  });

  return { register, handleSubmit, errors };
}
