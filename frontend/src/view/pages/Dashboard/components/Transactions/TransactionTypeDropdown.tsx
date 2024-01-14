import { ChevronDownIcon } from '@radix-ui/react-icons';
import { DropdownMenu } from '../../../../components/DropdownMenu';
import { ExpensesIcon } from '../../../../components/icons/ExpensesIcon';
import { IncomeIcon } from '../../../../components/icons/IncomeIcon';
import { TransactionsIcon } from '../../../../components/icons/TransactionsIcon';

export function TransactionTypeDropdown() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button type="button" className="flex justify-center items-center gap-2">
          <TransactionsIcon className="text-gray-900" />
          <span className="text-sm text-gray-800 font-medium">Transações</span>
          <ChevronDownIcon className="text-gray-900 w-6 h-6" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Item className="gap-2">
          <IncomeIcon />
          Receitas
        </DropdownMenu.Item>

        <DropdownMenu.Item className="gap-2">
          <ExpensesIcon />
          Despesas
        </DropdownMenu.Item>

        <DropdownMenu.Item className="gap-2">
          <TransactionsIcon />
          Transações
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
