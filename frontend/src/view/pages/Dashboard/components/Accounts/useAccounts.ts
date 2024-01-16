import { useState } from 'react';
import { useWindowWidth } from '../../../../../app/hooks/useWindowWidth';
import useDashboard from '../../contexts/useDashboard';

export function useAccounts() {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const width = useWindowWidth();
  const { isVisibleValues, toggleValuesVisibility, openNewAccountModal } = useDashboard();

  return {
    sliderState,
    setSliderState,
    windowWidth: width,
    isVisibleValues,
    toggleValuesVisibility,
    isLoading: false,
    accounts: [],
    openNewAccountModal,
  };
}
