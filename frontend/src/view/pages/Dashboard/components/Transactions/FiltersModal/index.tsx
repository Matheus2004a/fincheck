import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { cn } from '../../../../../../app/utils/cn';
import { Button } from '../../../../../components/Button';
import { Modal } from '../../../../../components/Modal';
import useFiltersModal from './useFiltersModal';

interface FiltersModalProps {
  open: boolean;
  onClose(): void;
  onApplyFilters(filters: { bankAccountId: string | undefined, year: number }): void;
}

export function FiltersModal({ open, onClose, onApplyFilters }: FiltersModalProps) {
  const {
    selectedBankAccountId, handleSelectBankAccount,
    selectedYear, handleChangeYear, accounts,
  } = useFiltersModal();

  return (
    <Modal open={open} title="Filtros" onClose={onClose}>
      <section>
        <p className="font-bold">Conta</p>

        <div className="space-y-2 mt-2">
          {accounts.map((account) => (
            <button
              key={account.id}
              type="button"
              onClick={() => handleSelectBankAccount(account.id)}
              className={cn(
                'p-2 rounded-2xl w-full text-left text-gray-800 hover:bg-gray-50 transition-colors',
                (account.id === selectedBankAccountId) && '!bg-gray-200',
              )}
            >
              {account.name}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-10 text-gray-800">
        <p className="font-bold">Ano</p>

        <div className="flex justify-between items-center w-1/2">
          <button type="button" className="p-3" onClick={() => handleChangeYear(-1)}>
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          <span className="text-sm">{selectedYear}</span>

          <button type="button" className="p-3" onClick={() => handleChangeYear(1)}>
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>

        <Button
          className="w-full mt-10"
          onClick={() => onApplyFilters({
            bankAccountId: selectedBankAccountId,
            year: selectedYear,
          })}
        >
          Aplicar Filtros
        </Button>
      </section>
    </Modal>
  );
}
