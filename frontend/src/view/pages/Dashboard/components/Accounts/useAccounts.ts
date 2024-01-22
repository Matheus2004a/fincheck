/* eslint-disable arrow-body-style */
import { useMemo, useState } from 'react';
import useBankAccounts from '../../../../../app/hooks/useBankAccounts';
import { useWindowWidth } from '../../../../../app/hooks/useWindowWidth';
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

  const { accounts, isLoading } = useBankAccounts();

  const currentBalance = useMemo(() => {
    return accounts.reduce((total, account) => total + account.currentBalance, 0);
  }, [accounts]);

  return {
    sliderState,
    setSliderState,
    windowWidth: width,
    isVisibleValues,
    toggleValuesVisibility,
    isLoading,
    accounts,
    openNewAccountModal,
    currentBalance,
    openEditAccountModal,
  };
}
