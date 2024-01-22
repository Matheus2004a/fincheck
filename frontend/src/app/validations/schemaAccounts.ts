import { z } from 'zod';

export const schemaAccounts = z.object({
  name: z.string().min(1, 'Nome da conta é obrigatório'),
  initialBalance: z.union([
    z.string().min(1, 'Saldo inicial é obrigatório'),
    z.number(),
  ]),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
  color: z.string().min(1, 'Cor da conta é obrigatória'),
});

export type FormData = z.infer<typeof schemaAccounts>;
