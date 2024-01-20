import { httpClient } from '../httpClient';

interface BankAccountParams {
  name: string,
  initialBalance: number,
  color: string,
  type: 'CHECKING' | 'INVESTMENT' | 'CASH';
}

export async function create(body: BankAccountParams) {
  const { data } = await httpClient.post('/bank-accounts', body);

  return data;
}
