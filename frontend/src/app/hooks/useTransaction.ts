import { useQuery } from '@tanstack/react-query';
import TransactionService from '../services/TransactionService';

export default function useTransaction() {
  const { data, isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => TransactionService.getAll({
      month: 0,
      year: 2024,
    }),
  });

  return {
    transactions: data ?? [],
    isLoading,
  };
}
