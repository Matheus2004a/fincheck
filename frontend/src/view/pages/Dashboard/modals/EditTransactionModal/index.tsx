import { Controller } from 'react-hook-form';
import { Transaction } from '../../../../../app/entities/Transaction';
import { Button } from '../../../../components/Button';
import { ConfirmDeleteModal } from '../../../../components/ConfirmDeleteModal';
import { DatePickerInput } from '../../../../components/DatePickerInput';
import { Input } from '../../../../components/Input';
import { InputCurrency } from '../../../../components/InputCurrency';
import { Modal } from '../../../../components/Modal';
import { Select } from '../../../../components/Select';
import { TrashIcon } from '../../../../components/icons/TrashIcon';
import useEditTransactionModal from './useEditTransactionModal';

interface EditTransactionModalProps {
  transaction: Transaction;
  open: boolean;
  onClose(): void;
}

export function EditTransactionModal({ transaction, open, onClose }: EditTransactionModalProps) {
  const {
    control, errors, handleSubmit, register, accounts, categories,
    isLoading, isDeleteModalOpen, isLoadingDelete,
    handleOpenDeleteModal, handleCloseDeleteModal, handleDeleteTransaction,
  } = useEditTransactionModal(transaction, onClose);

  const isIncome = transaction.type === 'INCOME';

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        title={`Tem certeza que deseja excluir esta ${isIncome ? 'receita' : 'despesa'}?`}
        isLoading={isLoadingDelete}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteTransaction}
      />
    );
  }

  return (
    <Modal
      title={isIncome ? 'Editar Receita' : 'Editar Despesa'}
      open={open}
      onClose={onClose}
      rightAction={(
        <button type="button" onClick={handleOpenDeleteModal}>
          <TrashIcon className="w-full h-full p-3 text-red-900" />
        </button>
      )}
    >
      <form onSubmit={handleSubmit}>
        <span className="text-gray-600 text-lg">Valor</span>

        <div className="flex items-center gap-2">
          <span className="text-gray-600 text-lg">R$</span>
          <Controller
            control={control}
            name="value"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                error={errors.value?.message}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-4 mt-10">
          <Input
            type="text"
            placeholder={isIncome ? 'Nome da Receita' : 'Nome da Despesa'}
            error={errors.name?.message}
            {...register('name')}
          />

          <Controller
            control={control}
            name="categoryId"
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Categoria"
                options={categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
                error={errors.categoryId?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="bankAccountId"
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder={isIncome ? 'Receber na conta' : 'Pagar na conta'}
                options={accounts.map((account) => ({
                  value: account.id,
                  label: account.name,
                }))}
                error={errors.bankAccountId?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="date"
            render={({ field: { onChange, value } }) => (
              <DatePickerInput
                error={errors.date?.message}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </div>

        <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
          Salvar
        </Button>
      </form>
    </Modal>
  );
}
