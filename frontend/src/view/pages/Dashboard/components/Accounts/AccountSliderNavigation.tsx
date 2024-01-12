import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { useSwiper } from 'swiper/react';

interface AccountSliderNavigationProps {
  isBeginning: boolean;
  isEnd: boolean;
}

export function AccountSliderNavigation({ isBeginning, isEnd }:AccountSliderNavigationProps) {
  const swiper = useSwiper();

  return (
    <div className="text-white">
      <button
        className="py-3.5 pl-2.5 pr-3.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40"
        onClick={() => swiper.slidePrev()}
        disabled={isBeginning}
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>

      <button
        className="py-3.5 pl-2.5 pr-3.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40"
        onClick={() => swiper.slideNext()}
        disabled={isEnd}
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>
    </div>
  );
}
