import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MONTHS } from '../../../../../app/config/constants';
import emptyStateImage from '../../../../../assets/empty-state.svg';
import { Spinner } from '../../../../components/Spinner';
import { FilterIcon } from '../../../../components/icons/FilterIcon';
import { TransactionsIcon } from '../../../../components/icons/TransactionsIcon';
import { CardTransaction } from './CardTransaction';
import { SliderNavigation } from './SliderNavigation';
import { SliderOption } from './SliderOption';
import useTransactions from './useTransactions';

export function Transactions() {
  const { isLoading, transactions } = useTransactions();

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

      {isLoading && (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner className="w-10 h-10" />
        </div>
      )}

      {!isLoading && (
        <section className="flex flex-col flex-1 gap-2 mt-4 overflow-y-auto">
            {transactions.length === 0 && (
              <figure className="flex flex-col justify-center items-center h-full">
                <img src={emptyStateImage} alt="empty-transactions" />
                <figcaption className="text-gray-700 text-center">
                  Não encontramos nenhuma transação!
                </figcaption>
              </figure>
            )}

            {transactions.length > 0 && (
              <>
                <CardTransaction />
                <CardTransaction />
              </>
            )}
        </section>
      )}
    </article>
  );
}
