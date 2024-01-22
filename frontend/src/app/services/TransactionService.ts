import { httpClient } from './httpClient';

interface TransactionParams {
  bankAccountId: string,
  categoryId: string,
  name: string,
  value: number,
  type: 'INCOME' | 'EXPENSE',
  date: Date
}

class TransactionService {
  async create(body: TransactionParams) {
    const { data } = await httpClient.post('/transactions', body);

    return data;
  }
}

export default new TransactionService();
