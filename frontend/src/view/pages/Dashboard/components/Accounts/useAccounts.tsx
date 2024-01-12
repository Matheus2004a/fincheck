import { useState } from 'react';
import { useWindowWidth } from '../../../../../app/hooks/useWindowWidth';

export function useAccounts() {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const width = useWindowWidth();

  return {
    sliderState,
    setSliderState,
    windowWidth: width,
  };
}
