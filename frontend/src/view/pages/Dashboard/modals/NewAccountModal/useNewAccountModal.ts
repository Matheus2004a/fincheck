import useDashboard from '../../contexts/useDashboard';

export default function useNewAccountModal() {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard();

  return {
    isNewAccountModalOpen,
    closeNewAccountModal,
  };
}
