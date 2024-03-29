import { Controller } from 'react-hook-form';
import { options } from '../../../../../app/config/optionsAccounts';
import { Button } from '../../../../components/Button';
import { ColorsDropdownInput } from '../../../../components/ColorsDropdown';
import { ConfirmDeleteModal } from '../../../../components/ConfirmDeleteModal';
import { Input } from '../../../../components/Input';
import { InputCurrency } from '../../../../components/InputCurrency';
import { Modal } from '../../../../components/Modal';
import { Select } from '../../../../components/Select';
import { TrashIcon } from '../../../../components/icons/TrashIcon';
import useEditAccountModal from './useEditAccountModal';

export function EditAccountModal() {
  const {
    isEditAccountModalOpen, closeEditAccountModal,
    errors, handleSubmit, register, control, isLoading,
    isDeleteModalOpen, handleOpenDeleteModal, handleCloseDeleteModal,
    isLoadingDelete, handleDeleteAccount, t,
  } = useEditAccountModal();

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        title={t('confirmDeleteModal.textConfirmation')}
        description={t('confirmDeleteModal.description')}
        isLoading={isLoadingDelete}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteAccount}
      />
    );
  }

  return (
    <Modal
      title={t('modals.editText')}
      open={isEditAccountModalOpen}
      onClose={closeEditAccountModal}
      rightAction={(
        <button type="button" onClick={handleOpenDeleteModal}>
          <TrashIcon className="w-full h-full p-3 text-red-900" />
        </button>
      )}
    >
      <form onSubmit={handleSubmit}>
        <span className="text-gray-600 text-lg">{t('modals.balanceText')}</span>

        <div className="flex items-center gap-2">
          <span className="text-gray-600 text-lg">{t('countryCurrency')}</span>

          <Controller
            control={control}
            name="initialBalance"
            defaultValue="0"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                error={errors.initialBalance?.message}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-4 mt-10">
          <Input
            type="text"
            placeholder={t('modals.nameAccount')}
            error={errors.name?.message}
            {...register('name')}
          />

          <Controller
            control={control}
            name="type"
            defaultValue="CHECKING"
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder={t('modals.select')}
                options={options}
                error={errors.type?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="color"
            render={({ field: { onChange, value } }) => (
              <ColorsDropdownInput
                error={errors.color?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </div>

        <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
          {t('editAccountModal.btnSave')}
        </Button>
      </form>
    </Modal>
  );
}
