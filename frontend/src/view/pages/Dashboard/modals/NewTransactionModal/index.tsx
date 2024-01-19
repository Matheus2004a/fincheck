import { DatePickerInput } from '../../../../components/DatePickerInput';
import { Input } from '../../../../components/Input';
import { InputCurrency } from '../../../../components/InputCurrency';
import { Modal } from '../../../../components/Modal';
import { Select } from '../../../../components/Select';
import useNewTransactionModal from './useNewTransactionModal';

const options = [
  {
    value: 'INVESTMENT',
    label: 'Investimentos',
  },
  {
    value: 'CASH',
    label: 'Dinheiro Físico',
  },
  {
    value: 'CHECKING',
    label: 'Conta Corrente',
  },
];

export function NewTransactionModal() {
  const {
    isNewTransactionModalOpen, closeNewTransactionModal, newTransactionType,
  } = useNewTransactionModal();

  const isIncome = newTransactionType === 'INCOME';

  return (
    <Modal
      title={isIncome ? 'Nova Receita' : 'Nova Despesa'}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
    >
      <form>
        <span className="text-gray-600 text-lg">Valor</span>

        <div className="flex items-center gap-2">
          <span className="text-gray-600 text-lg">R$</span>
          <InputCurrency />
        </div>

        <div className="flex flex-col gap-4 mt-10">
          <Input
            type="text"
            name="initialBalance"
            placeholder={isIncome ? 'Nome da Receita' : 'Nome da Despesa'}
          />

          <Select
            placeholder="Categoria"
            options={options}
          />

          <Select
            placeholder={isIncome ? 'Receber na conta' : 'Pagar na conta'}
            options={options}
          />

          <DatePickerInput />
        </div>
      </form>
    </Modal>
  );
}
