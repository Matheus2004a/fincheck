import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { formatDate } from '../../../../../app/utils/formatDate';
import { CategoryIcon } from '../../../../components/icons/categories/CategoryIcon';

export function CardTransaction() {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-2xl">
      <div className="flex-1 flex gap-3">
        <CategoryIcon type="income" />

        <div>
          <strong>Almoço</strong>
          <small className="text-sm text-gray-600 block">
            {formatDate(new Date('2024-01-12T19:05:00.838Z'))}
          </small>
        </div>
      </div>

      <span className="text-green-800 font-semibold tracking-[-0.5px]">
        +
        {' '}
        {formatCurrency(2500)}
      </span>
    </div>
  );
}
