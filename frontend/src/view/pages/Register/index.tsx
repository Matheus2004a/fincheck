import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import useRegister from './useRegister';

export function Register() {
  const {
    handleSubmit, errors, register, isLoading, t,
  } = useRegister();

  return (
    <>
      <Header
        title={t('register.createAccount')}
        subtitle={t('register.alreadyAccount')}
        text={t('register.loginText')}
        href="/login"
      />

      <form onSubmit={handleSubmit} className="mt-[60px] flex flex-col gap-4">
        <fieldset>
          <Input
            type="text"
            placeholder={t('form.name')}
            error={errors.name?.message}
            {...register('name')}
          />
        </fieldset>

        <fieldset>
          <Input
            type="email"
            placeholder={t('form.email')}
            error={errors.email?.message}
            {...register('email')}
          />
        </fieldset>

        <fieldset>
          <Input
            type="password"
            placeholder={t('form.password')}
            error={errors.password?.message}
            {...register('password')}
          />
        </fieldset>

        <Button type="submit" className="mt-2" isLoading={isLoading}>
          {t('register.createText')}
        </Button>
      </form>
    </>
  );
}
