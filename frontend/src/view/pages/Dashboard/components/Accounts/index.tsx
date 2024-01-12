import { Swiper, SwiperSlide } from 'swiper/react';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { Button } from '../../../../components/Button';
import { EyeIcon } from '../../../../components/icons/EyeIcon';
import { AccountCard } from './AccountCard';

import 'swiper/css';
import { cn } from '../../../../../app/utils/cn';
import { AccountSliderNavigation } from './AccountSliderNavigation';
import { useAccounts } from './useAccounts';

export function Accounts() {
  const {
    sliderState, setSliderState, windowWidth,
    isVisibleValues, toggleValuesVisibility,
  } = useAccounts();

  return (
    <article className="w-full md:w-1/2 bg-teal-900 rounded-2xl h-full md:p-10 px-4 py-8 flex flex-col md:gap-0 gap-10">
      <section className="text-white">
        <p className="tracking-[-0.5px]">Saldo total</p>

        <div className="flex items-center gap-2">
          <strong
            className={cn(
              'text-2xl tracking-[-1px]',
              !isVisibleValues && 'blur',
            )}
          >
            {isVisibleValues ? formatCurrency(100) : '------'}
          </strong>

          <Button
            className="w-8 h-8 flex items-center"
            onClick={toggleValuesVisibility}
          >
            <EyeIcon open={isVisibleValues} />
          </Button>
        </div>
      </section>

      <section className="flex-1 flex flex-col justify-end">
        <div>
          <Swiper
            spaceBetween={16}
            slidesPerView={windowWidth >= 500 ? 2.1 : 1.2}
            className="w-full"
            onSlideChange={(swiper) => {
              setSliderState({
                isBeginning: swiper.isBeginning,
                isEnd: swiper.isEnd,
              });
            }}
          >
            <header className="flex justify-between items-center mb-4" slot="container-start">
              <strong className="text-white tracking-[-1px] text-lg">
                Minhas contas
              </strong>

              <AccountSliderNavigation
                isBeginning={sliderState.isBeginning}
                isEnd={sliderState.isEnd}
              />
            </header>

            <SwiperSlide>
              <AccountCard
                color="#FD7E14"
                name="Nubank"
                balance={1000}
                type="CASH"
              />
            </SwiperSlide>

            <SwiperSlide>
              <AccountCard
                color="#333"
                name="XP"
                balance={1000}
                type="INVESTMENT"
              />
            </SwiperSlide>

            <SwiperSlide>
              <AccountCard
                color="#0f0"
                name="Pagamento"
                balance={1000}
                type="CHECKING"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </article>
  );
}
