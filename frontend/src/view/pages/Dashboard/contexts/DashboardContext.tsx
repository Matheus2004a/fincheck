import { createContext, useCallback, useState } from 'react';
import { storage } from '../../../../app/config/storage';

interface DashboardContextValue {
  isVisibleValues: boolean;
  toggleValuesVisibility(): void;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [isVisibleValues, setIsVisibleValues] = useState<boolean>(() => {
    const storedVisibility = localStorage.getItem(storage.VALUE_IS_VISIBLE);

    return storedVisibility === 'true';
  });

  const toggleValuesVisibility = useCallback(() => {
    setIsVisibleValues((prevState) => {
      localStorage.setItem(storage.VALUE_IS_VISIBLE, JSON.stringify(!prevState));

      return !prevState;
    });
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        isVisibleValues,
        toggleValuesVisibility,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
