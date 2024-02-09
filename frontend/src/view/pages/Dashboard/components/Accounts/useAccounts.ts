import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useBankAccounts from '../../../../../app/hooks/useBankAccounts';
import useWindowWidth from '../../../../../app/hooks/useWindowWidth';
import useLanguage from '../../../../../app/hooks/useLanguage';
import useDashboard from '../../contexts/useDashboard';

export default function useAccounts() {
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
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation();

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
    currentLanguage,
    t,
  };
}
