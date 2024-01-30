import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import illustration from '../../assets/images/illustration.png';
import { Logo } from '../components/Logo';

export function AuthLayout() {
  const { t } = useTranslation();

  return (
    <main className="flex w-full h-full">
      <article className="w-full h-full flex flex-col items-center justify-center gap-16 lg:w-1/2">
        <Logo className="h-6 text-gray-500" />

        <section className="w-full max-w-[504px] px-8">
          <Outlet />
        </section>
      </article>

      <article className="w-1/2 h-full hidden justify-center items-center p-8 relative lg:flex">
        <img
          src={illustration}
          alt="img-illustration"
          className="object-cover w-full h-full max-w-[656px] max-h-[960px] select-none rounded-[32px]"
        />

        <section className="max-w-full bottom-0 mx-8 bg-white absolute p-10 rounded-b-[32px]">
          <Logo className="text-teal-900 h-8" />
          <p className="text-gray-700 font-medium text-xl mt-6">
            {t('welcomeText')}
          </p>
        </section>
      </article>
    </main>
  );
}
