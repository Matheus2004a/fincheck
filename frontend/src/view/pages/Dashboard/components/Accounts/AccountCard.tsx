import { useTranslation } from 'react-i18next';
import { BankAccount } from '../../../../../app/entities/BankAccount';
import { cn } from '../../../../../app/utils/cn';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { BankAccountTypeIcon } from '../../../../components/icons/BankAccountTypeIcon';
import useAccounts from './useAccounts';

interface AccountCardProps {
  data: BankAccount;
}

export function AccountCard({ data }: AccountCardProps) {
  const {
    color, name, currentBalance, type,
  } = data;

  const { isVisibleValues, openEditAccountModal } = useAccounts();

  const { t } = useTranslation();

  return (
    <div
      className="bg-white p-4 rounded-2xl h-52 flex flex-col justify-between border-b-4"
      style={{ borderColor: color }}
      role="button"
      onClick={() => openEditAccountModal(data)}
    >
      <div>
        <BankAccountTypeIcon type={type} />
        <p className="text-gray-800 font-medium tracking-[-0.5px] mt-4">
          {name}
        </p>
      </div>

      <div>
        <p className={cn(
          'text-gray-800 font-medium tracking-[-0.5px]',
          !isVisibleValues && 'blur-sm',
        )}
        >
          {isVisibleValues ? formatCurrency(currentBalance) : '------'}
        </p>
        <small className="text-gray-600 text-sm">{t('currency.current')}</small>
      </div>
    </div>
  );
}
