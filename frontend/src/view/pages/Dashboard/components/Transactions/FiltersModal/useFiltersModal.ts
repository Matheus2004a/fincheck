import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useAccounts from '../../Accounts/useAccounts';

export default function useFiltersModal() {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<string | undefined>(undefined);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const isDisabledYear = selectedYear === new Date().getFullYear();

  const { accounts } = useAccounts();
  const { t } = useTranslation();

  function handleSelectBankAccount(bankAccountId: string) {
    setSelectedBankAccountId((prevState) => (
      prevState === bankAccountId ? undefined : bankAccountId
    ));
  }

  function handleChangeYear(step: number) {
    setSelectedYear((prevState) => prevState + step);
  }

  return {
    handleSelectBankAccount,
    selectedBankAccountId,
    selectedYear,
    handleChangeYear,
    accounts,
    isDisabledYear,
    t,
  };
}
