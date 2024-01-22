import { z } from 'zod';

export const schemaTransaction = z.object({
  value: z.union([
    z.string().min(1, 'Informe o valor'),
    z.number(),
  ]),
  name: z.string().min(1, 'Informe o nome'),
  category: z.string().min(1, 'Informe a categoria'),
  bankAccountId: z.string().min(1, 'Escolha uma conta'),
  date: z.date(),
});

export type FormData = z.infer<typeof schemaTransaction>
