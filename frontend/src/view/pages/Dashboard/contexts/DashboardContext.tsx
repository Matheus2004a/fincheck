import { createContext, useCallback, useState } from 'react';
import { storage } from '../../../../app/config/storage';

interface DashboardContextValue {
  isVisibleValues: boolean;
  toggleValuesVisibility(): void;
  isNewAccountModalOpen: boolean;
  openNewAccountModal(): void;
  closeNewAccountModal(): void;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [isVisibleValues, setIsVisibleValues] = useState<boolean>(() => {
    const storedVisibility = localStorage.getItem(storage.VALUE_IS_VISIBLE);

    return storedVisibility === 'true';
  });

  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);

  const toggleValuesVisibility = useCallback(() => {
    setIsVisibleValues((prevState) => {
      localStorage.setItem(storage.VALUE_IS_VISIBLE, JSON.stringify(!prevState));

      return !prevState;
    });
  }, []);

  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(true);
  }, []);

  const closeNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(false);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        isVisibleValues,
        toggleValuesVisibility,
        isNewAccountModalOpen,
        openNewAccountModal,
        closeNewAccountModal,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
