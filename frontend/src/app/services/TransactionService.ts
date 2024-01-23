import { Transaction } from '../entities/Transaction';
import { httpClient } from './httpClient';

interface TransactionParams {
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  type: 'INCOME' | 'EXPENSE';
  date: string;
}

type TransactionResponse = Transaction[];

type TransactionFilters = {
  month: number;
  year: number;
  bankAccountId?: string;
  type?: Transaction['type'];
}

class TransactionService {
  async create(body: TransactionParams) {
    const { data } = await httpClient.post('/transactions', body);

    return data;
  }

  async getAll(filters: TransactionFilters) {
    const { data } = await httpClient.get<TransactionResponse>('/transactions', {
      params: filters,
    });

    return data;
  }
}

export default new TransactionService();
