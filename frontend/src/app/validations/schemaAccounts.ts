import { z } from 'zod';

export const schema = z.object({
  name: z.string().min(1, 'Nome da conta é obrigatório'),
  initialBalance: z.string().min(1, 'Saldo inicial é obrigatório'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
  color: z.string().min(1, 'Cor da conta é obrigatória'),
});
