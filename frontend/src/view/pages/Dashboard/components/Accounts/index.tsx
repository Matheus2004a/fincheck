import { PlusIcon } from '@radix-ui/react-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { Button } from '../../../../components/Button';
import { EyeIcon } from '../../../../components/icons/EyeIcon';
import { AccountCard } from './AccountCard';

import 'swiper/css';
import { cn } from '../../../../../app/utils/cn';
import { Spinner } from '../../../../components/Spinner';
import { AccountSliderNavigation } from './AccountSliderNavigation';
import { useAccounts } from './useAccounts';

export function Accounts() {
  const {
    sliderState, setSliderState, windowWidth,
    isVisibleValues, toggleValuesVisibility,
    isLoading, accounts, openNewAccountModal,
    currentBalance,
  } = useAccounts();

  return (
    <article className="w-full md:w-1/2 bg-teal-900 rounded-2xl h-full md:p-10 px-4 py-8 flex flex-col md:gap-0 gap-10">
      {isLoading && (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner className="w-10 h-10 text-teal-950/50 fill-white" />
        </div>
      )}

      {!isLoading && (
        <>
          <section className="text-white">
            <p className="tracking-[-0.5px]">Saldo total</p>

            <div className="flex items-center gap-2">
              <strong
                className={cn(
                  'text-2xl tracking-[-1px]',
                  !isVisibleValues && 'blur',
                )}
              >
                {isVisibleValues ? formatCurrency(currentBalance) : '------'}
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
            {accounts.length === 0 && (
              <>
                <header className="mb-4" slot="container-start">
                  <strong className="text-white tracking-[-1px] text-lg">
                    Minhas contas
                  </strong>
                </header>

                <button
                  type="button"
                  onClick={openNewAccountModal}
                  className="flex flex-col justify-center items-center h-52 text-white gap-4 mt-4 border-2 border-dashed border-teal-600 rounded-2xl"
                >
                  <PlusIcon className="w-11 h-11 p-2.5 border-2 border-dashed rounded-full" />
                  <span className="w-32 font-medium tracking-[-0.5px] text-center">
                    Cadastre uma nova conta
                  </span>
                </button>
              </>
            )}

            {accounts.length > 0 && (
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

                {accounts.map((account) => (
                  <SwiperSlide key={account.id}>
                    <AccountCard
                      color={account.color}
                      name={account.name}
                      balance={account.currentBalance}
                      type={account.type}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </section>
        </>
      )}
    </article>
  );
}
