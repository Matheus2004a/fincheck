import { useQuery } from '@tanstack/react-query';
import BankAccountService from '../services/BankAccountService';

export default function useBankAccounts() {
  const { data, isLoading } = useQuery({
    queryKey: ['bankAccounts'],
    queryFn: BankAccountService.getAll,
  });

  return { accounts: data ?? [], isLoading };
}
