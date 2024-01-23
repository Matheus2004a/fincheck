import { cn } from '../../../../../app/utils/cn';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { formatDate } from '../../../../../app/utils/formatDate';
import { CategoryIcon } from '../../../../components/icons/categories/CategoryIcon';
import useTransactions from './useTransactions';

interface CardTransactionProps {
  data: {
    name: string;
    value: number;
    type: 'INCOME' | 'EXPENSE';
    date: string;
  },
  category?: {
    id: string;
    icon: string;
  }
}

export function CardTransaction({ data, category }: CardTransactionProps) {
  const { isVisibleValues } = useTransactions();

  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-2xl">
      <div className="flex-1 flex gap-3">
        <CategoryIcon
          type={data.type === 'INCOME' ? 'income' : 'expense'}
          category={category?.icon}
        />

        <div>
          <strong>{data.name}</strong>
          <small className="text-sm text-gray-600 block">
            {formatDate(new Date(data.date))}
          </small>
        </div>
      </div>

      <span className={cn(
        'font-semibold tracking-[-0.5px]',
        !isVisibleValues && 'blur',
        data.type === 'INCOME' ? 'text-green-800' : 'text-red-800',
      )}
      >
        {data.type === 'INCOME' ? '+' : '-'}
        {' '}
        {isVisibleValues ? formatCurrency(data.value) : '---'}
      </span>
    </div>
  );
}
