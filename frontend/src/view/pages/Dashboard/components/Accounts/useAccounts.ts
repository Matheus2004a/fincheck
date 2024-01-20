import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useWindowWidth } from '../../../../../app/hooks/useWindowWidth';
import BankAccountService from '../../../../../app/services/BankAccountService';
import useDashboard from '../../contexts/useDashboard';

export function useAccounts() {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const width = useWindowWidth();
  const {
    isVisibleValues, toggleValuesVisibility, openNewAccountModal,
    openEditAccountModal,
  } = useDashboard();

  const { data, isLoading } = useQuery({
    queryKey: ['bankAccounts'],
    queryFn: BankAccountService.getAll,
  });

  const currentBalance = useMemo(() => {
    if (!data) return 0;

    return data.reduce((total, account) => total + account.currentBalance, 0);
  }, [data]);

  return {
    sliderState,
    setSliderState,
    windowWidth: width,
    isVisibleValues,
    toggleValuesVisibility,
    isLoading,
    accounts: data ?? [],
    openNewAccountModal,
    currentBalance,
    openEditAccountModal,
  };
}
