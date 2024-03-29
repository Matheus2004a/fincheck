import { Swiper, SwiperSlide } from 'swiper/react';
import { BR_MONTHS, EN_MONTHS } from '../../../../../app/config/constants';
import emptyStateImage from '../../../../../assets/empty-state.svg';
import { Spinner } from '../../../../components/Spinner';
import { FilterIcon } from '../../../../components/icons/FilterIcon';
import { EditTransactionModal } from '../../modals/EditTransactionModal';
import { CardTransaction } from './CardTransaction';
import { FiltersModal } from './FiltersModal';
import { SliderNavigation } from './SliderNavigation';
import { SliderOption } from './SliderOption';
import { TransactionTypeDropdown } from './TransactionTypeDropdown';
import useTransactions from './useTransactions';

export function Transactions() {
  const {
    isLoading, transactions, isFiltersModalOpen,
    handleOpenFiltersModal, handleCloseFiltersModal,
    handleChangeFilters, filters, handleApplyFilters,
    handleOpenEditModal, handleCloseEditModal, isEditModalOpen, transactionEdited,
    currentLanguage, t,
  } = useTransactions();

  return (
    <article className="w-full md:w-1/2 bg-gray-100 rounded-2xl h-full p-10 flex flex-col">
      <header>
        <div className="flex justify-between mb-6">
          <TransactionTypeDropdown
            onSelect={(type) => handleChangeFilters('type')(type)}
            selectedType={filters.type}
          />

          <button type="button" onClick={handleOpenFiltersModal}>
            <FilterIcon />
          </button>
        </div>

        <Swiper
          slidesPerView={3}
          spaceBetween={16}
          centeredSlides
          className="relative flex items-center"
          initialSlide={filters.month}
          onSlideChange={(swiper) => {
            handleChangeFilters('month')(swiper.activeIndex);
          }}
        >
          <SliderNavigation />

          {currentLanguage === 'pt-BR'
            ? BR_MONTHS.map((month, index) => (
              <SwiperSlide key={month}>
                {({ isActive }) => (
                  <SliderOption
                    isActive={isActive}
                    month={month}
                    index={index}
                  />
                )}
              </SwiperSlide>
            )) : EN_MONTHS.map((month, index) => (
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
        <>
          <FiltersModal
            open={isFiltersModalOpen}
            onClose={handleCloseFiltersModal}
            onApplyFilters={handleApplyFilters}
          />

          <section className="flex flex-col flex-1 gap-2 mt-4 overflow-y-auto">
            {transactions.length === 0 && (
              <figure className="flex flex-col justify-center items-center h-full">
                <img src={emptyStateImage} alt="empty-transactions" />
                <figcaption className="text-gray-700 text-center">
                  {t('transactions.notFound')}
                </figcaption>
              </figure>
            )}

            {transactions.length > 0 && (
              <>
                {transactionEdited && (
                  <EditTransactionModal
                    open={isEditModalOpen}
                    onClose={handleCloseEditModal}
                    transaction={transactionEdited}
                  />
                )}

                {transactions.map((transaction) => (
                  <CardTransaction
                    key={transaction.id}
                    data={transaction}
                    onClick={handleOpenEditModal}
                  />
                ))}
              </>
            )}
          </section>
        </>
      )}
    </article>
  );
}
