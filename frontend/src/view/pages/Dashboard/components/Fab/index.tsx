import { PlusIcon } from '@radix-ui/react-icons';
import { useTranslation } from 'react-i18next';
import { DropdownMenu } from '../../../../components/DropdownMenu';
import { BankAccountIcon } from '../../../../components/icons/BankAccountIcon';
import { CategoryIcon } from '../../../../components/icons/categories/CategoryIcon';
import useDashboard from '../../contexts/useDashboard';

export function Fab() {
  const { openNewAccountModal, openNewTransactionModal } = useDashboard();

  const { t } = useTranslation();

  return (
    <div className="fixed right-4 bottom-4 z-50">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button
            type="button"
            className="bg-teal-900 p-3 rounded-full text-white"
          >
            <PlusIcon className="w-6 h-6" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Item className="gap-2" onSelect={() => openNewTransactionModal('EXPENSE')}>
            <CategoryIcon type="expense" />
            {t('fab.expense')}
          </DropdownMenu.Item>

          <DropdownMenu.Item className="gap-2" onSelect={() => openNewTransactionModal('INCOME')}>
            <CategoryIcon type="income" />
            {t('fab.income')}
          </DropdownMenu.Item>

          <DropdownMenu.Item className="gap-2" onSelect={openNewAccountModal}>
            <BankAccountIcon />
            {t('fab.newAccount')}
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}
