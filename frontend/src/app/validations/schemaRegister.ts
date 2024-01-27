import { z } from 'zod';

export const schemaRegister = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória').min(8, 'A senha deve ter 8 digítos'),
});

export type FormData = z.infer<typeof schemaRegister>
