import { Controller } from 'react-hook-form';
import { Button } from '../../../../components/Button';
import { DatePickerInput } from '../../../../components/DatePickerInput';
import { Input } from '../../../../components/Input';
import { InputCurrency } from '../../../../components/InputCurrency';
import { Modal } from '../../../../components/Modal';
import { Select } from '../../../../components/Select';
import useNewTransactionModal from './useNewTransactionModal';

export function NewTransactionModal() {
  const {
    isNewTransactionModalOpen, closeNewTransactionModal, newTransactionType,
    control, errors, handleSubmit, register, accounts, categories,
    isLoading, t,
  } = useNewTransactionModal();

  const isIncome = newTransactionType === 'INCOME';

  return (
    <Modal
      title={isIncome ? t('newTransactionModal.income') : t('newTransactionModal.expense')}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
    >
      <form onSubmit={handleSubmit}>
        <span className="text-gray-600 text-lg">{t('newTransactionModal.value')}</span>

        <div className="flex items-center gap-2">
          <span className="text-gray-600 text-lg">{t('countryCurrency')}</span>
          <Controller
            control={control}
            name="value"
            defaultValue="0"
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
            placeholder={isIncome
              ? t('newTransactionModal.nameIncome')
              : t('newTransactionModal.nameExpense')}
            error={errors.name?.message}
            {...register('name')}
          />

          <Controller
            control={control}
            name="categoryId"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder={t('newTransactionModal.category')}
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
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder={isIncome
                  ? t('modals.receiveAccount')
                  : t('modals.payAccount')}
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
            defaultValue={new Date()}
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
          {t('btnCreate')}
        </Button>
      </form>
    </Modal>
  );
}
