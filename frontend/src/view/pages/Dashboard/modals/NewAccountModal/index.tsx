import { ColorsDropdownInput } from '../../../../components/ColorsDropdown';
import { Input } from '../../../../components/Input';
import { InputCurrency } from '../../../../components/InputCurrency';
import { Modal } from '../../../../components/Modal';
import { Select } from '../../../../components/Select';
import useNewAccountModal from './useNewAccountModal';

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

export function NewAccountModal() {
  const { isNewAccountModalOpen, closeNewAccountModal } = useNewAccountModal();

  return (
    <Modal
      title="Nova Conta"
      open={isNewAccountModalOpen}
      onClose={closeNewAccountModal}
    >
      <form>
        <span className="text-gray-600 text-lg">Saldo</span>

        <div className="flex items-center gap-2">
          <span className="text-gray-600 text-lg">R$</span>
          <InputCurrency />
        </div>

        <div className="flex flex-col gap-4 mt-10">
          <Input
            type="text"
            name="initialBalance"
            placeholder="Nome da Conta"
          />

          <Select
            placeholder="Selecione uma conta"
            options={options}
          />

          <ColorsDropdownInput />
        </div>
      </form>
    </Modal>
  );
}
