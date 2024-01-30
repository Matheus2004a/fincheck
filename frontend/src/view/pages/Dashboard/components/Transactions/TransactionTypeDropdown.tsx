import { ChevronDownIcon } from '@radix-ui/react-icons';
import { useTranslation } from 'react-i18next';
import { DropdownMenu } from '../../../../components/DropdownMenu';
import { ExpensesIcon } from '../../../../components/icons/ExpensesIcon';
import { IncomeIcon } from '../../../../components/icons/IncomeIcon';
import { TransactionsIcon } from '../../../../components/icons/TransactionsIcon';

interface TransactionTypeDropdownProps {
  selectedType: 'INCOME' | 'EXPENSE' | undefined;
  onSelect(type: 'INCOME' | 'EXPENSE' | undefined): void;
}

export function TransactionTypeDropdown({ selectedType, onSelect }: TransactionTypeDropdownProps) {
  const { t } = useTranslation();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button type="button" className="flex justify-center items-center gap-2">
          {selectedType === 'INCOME' && <IncomeIcon />}
          {selectedType === 'EXPENSE' && <ExpensesIcon />}
          {!selectedType && <TransactionsIcon />}

          <span className="text-sm text-gray-800 font-medium">
            {selectedType === 'INCOME' && t('transactions.income')}
            {selectedType === 'EXPENSE' && t('transactions.expense')}
            {!selectedType && t('transactions.mainText')}
          </span>
          <ChevronDownIcon className="text-gray-900 w-6 h-6" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Item className="gap-2" onSelect={() => onSelect('INCOME')}>
          <IncomeIcon />
          {t('transactions.income')}
        </DropdownMenu.Item>

        <DropdownMenu.Item className="gap-2" onSelect={() => onSelect('EXPENSE')}>
          <ExpensesIcon />
          {t('transactions.expense')}
        </DropdownMenu.Item>

        <DropdownMenu.Item className="gap-2" onSelect={() => onSelect(undefined)}>
          <TransactionsIcon />
          {t('transactions.mainText')}
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
