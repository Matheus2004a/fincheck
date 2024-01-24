import { useQuery } from '@tanstack/react-query';
import TransactionService, { TransactionFilters } from '../services/TransactionService';

export default function useTransaction(filters: TransactionFilters) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => TransactionService.getAll(filters),
  });

  return {
    transactions: data ?? [],
    isLoading,
    refetchTransactions: refetch,
  };
}
