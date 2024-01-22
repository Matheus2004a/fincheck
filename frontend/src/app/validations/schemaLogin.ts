import { z } from 'zod';

export const schemaLogin = z.object({
  email: z.string().min(1, 'Insira seu e-mail para entrar').email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória').min(8, 'A senha deve ter 8 digítos'),
});

export type FormData = z.infer<typeof schemaLogin>
