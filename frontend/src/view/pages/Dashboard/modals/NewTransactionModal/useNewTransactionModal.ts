import useDashboard from '../../contexts/useDashboard';

export default function useNewTransactionModal() {
  const {
    isNewTransactionModalOpen, openNewTransactionModal, closeNewTransactionModal,
    newTransactionType,
  } = useDashboard();

  return {
    isNewTransactionModalOpen,
    openNewTransactionModal,
    closeNewTransactionModal,
    newTransactionType,
  };
}
