import { Transaction } from '../entities/Transaction';
import { httpClient } from './httpClient';

interface TransactionParams {
  id?: string;
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  type: 'INCOME' | 'EXPENSE';
  date: string;
}

type TransactionResponse = Transaction[];

export type TransactionFilters = {
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

  async update({ id, ...params }: TransactionParams) {
    const { data } = await httpClient.put(`/transactions/${id}`, params);

    return data;
  }

  async remove(transactionId: string) {
    const { data } = await httpClient.delete(`/transactions/${transactionId}`);

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
