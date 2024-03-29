import { BankAccount } from '../entities/BankAccount';
import { httpClient } from './httpClient';

interface BankAccountParams {
  id?: string,
  name: string,
  initialBalance: number,
  color: string,
  type: 'CHECKING' | 'INVESTMENT' | 'CASH';
}

type BankAccountResponse = BankAccount[]

class BankAccountService {
  async create(body: BankAccountParams) {
    const { data } = await httpClient.post('/bank-accounts', body);

    return data;
  }

  async getAll() {
    const { data } = await httpClient.get<BankAccountResponse>('/bank-accounts');

    return data;
  }

  async update({ id, ...params }: BankAccountParams) {
    const { data } = await httpClient.put(`/bank-accounts/${id}`, params);

    return data;
  }

  async remove(bankAccountId: string) {
    const { data } = await httpClient.delete(`/bank-accounts/${bankAccountId}`);

    return data;
  }
}

export default new BankAccountService();
