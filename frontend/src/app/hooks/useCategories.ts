import { useQuery } from '@tanstack/react-query';
import CategoriesService from '../services/CategoriesService';

export default function useCategories() {
  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: CategoriesService.getAll,
  });

  return { categories: data ?? [], isLoading };
}
