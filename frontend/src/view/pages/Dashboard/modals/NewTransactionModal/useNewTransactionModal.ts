/* eslint-disable arrow-body-style */
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import useBankAccounts from '../../../../../app/hooks/useBankAccounts';
import useCategories from '../../../../../app/hooks/useCategories';
import { FormData, schemaTransaction } from '../../../../../app/validations/schemaTransaction';
import useDashboard from '../../contexts/useDashboard';

export default function useNewTransactionModal() {
  const {
    isNewTransactionModalOpen, openNewTransactionModal, closeNewTransactionModal,
    newTransactionType,
  } = useDashboard();

  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();

  const categories = useMemo(() => {
    return categoriesList.filter((category) => category.type === newTransactionType);
  }, [categoriesList, newTransactionType]);

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schemaTransaction),
  });

  const handleSubmit = hookFormSubmit((data) => {
    console.log({ data });
  });

  return {
    isNewTransactionModalOpen,
    openNewTransactionModal,
    closeNewTransactionModal,
    newTransactionType,
    handleSubmit,
    register,
    errors,
    control,
    accounts,
    categories,
  };
}
