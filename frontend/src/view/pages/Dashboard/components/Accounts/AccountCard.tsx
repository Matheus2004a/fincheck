import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { BankAccountTypeIcon } from '../../../../components/icons/BankAccountTypeIcon';

interface AccountCardProps {
  color: string;
  name: string;
  balance: number;
  type: 'CASH' | 'CHECKING' | 'INVESTMENT';
}

export function AccountCard({
  color, name, balance, type,
}: AccountCardProps) {
  return (
    <div
      className="bg-white p-4 rounded-2xl h-52 flex flex-col justify-between border-b-4"
      style={{ borderColor: color }}
    >
      <div>
        <BankAccountTypeIcon type={type} />
        <p className="text-gray-800 font-medium tracking-[-0.5px] mt-4">
          {name}
        </p>
      </div>

      <div>
        <p className="text-gray-800 font-medium tracking-[-0.5px]">
          {formatCurrency(balance)}
        </p>
        <small className="text-gray-600 text-sm">Saldo atual</small>
      </div>
    </div>
  );
}
