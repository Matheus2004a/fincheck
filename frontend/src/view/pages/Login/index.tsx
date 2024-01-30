import { useTranslation } from 'react-i18next';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import useLogin from './useLogin';

export function Login() {
  const {
    register, handleSubmit, errors, isLoading,
  } = useLogin();

  const { t } = useTranslation();

  return (
    <>
      <Header
        title={t('login.signinText')}
        subtitle={t('login.newHere')}
        text={t('login.createAccount')}
        href="/register"
      />

      <form onSubmit={handleSubmit} className="mt-[60px] flex flex-col gap-4">
        <fieldset>
          <Input
            type="email"
            placeholder={t('form.email')}
            error={t(errors.email?.message)}
            {...register('email')}
          />
        </fieldset>

        <fieldset>
          <Input
            type="password"
            placeholder={t('form.password')}
            error={t(errors.password?.message)}
            {...register('password')}
          />
        </fieldset>

        <Button type="submit" className="mt-2" isLoading={isLoading}>
          {t('login.signin')}
        </Button>
      </form>
    </>
  );
}
