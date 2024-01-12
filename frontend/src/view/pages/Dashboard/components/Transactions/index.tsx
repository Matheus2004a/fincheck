import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MONTHS } from '../../../../../app/config/constants';
import { FilterIcon } from '../../../../components/icons/FilterIcon';
import { TransactionsIcon } from '../../../../components/icons/TransactionsIcon';
import { CardTransaction } from './CardTransaction';
import { SliderNavigation } from './SliderNavigation';
import { SliderOption } from './SliderOption';

export function Transactions() {
  return (
    <article className="w-full md:w-1/2 bg-gray-100 rounded-2xl h-full p-10 flex flex-col">
      <header>
        <div className="flex justify-between mb-6">
          <button type="button" className="flex justify-center items-center gap-2">
            <TransactionsIcon className="text-gray-900" />
            <span className="text-sm text-gray-800 font-medium">Transações</span>
            <ChevronDownIcon className="text-gray-900 w-6 h-6" />
          </button>

          <button type="button">
            <FilterIcon />
          </button>
        </div>

        <Swiper
          slidesPerView={3}
          spaceBetween={16}
          centeredSlides
          className="relative flex items-center"
        >
          <SliderNavigation />

          {MONTHS.map((month, index) => (
            <SwiperSlide key={month}>
              {({ isActive }) => (
                <SliderOption
                  isActive={isActive}
                  month={month}
                  index={index}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </header>

      <section className="flex flex-col flex-1 gap-2 mt-4 overflow-y-auto">
        <CardTransaction />
        <CardTransaction />
      </section>
    </article>
  );
}
