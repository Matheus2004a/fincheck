import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import useLogin from './useLogin';

export function Login() {
  const {
    register, handleSubmit, errors, isLoading,
  } = useLogin();

  return (
    <>
      <Header
        title="Entre em sua conta"
        subtitle="Novo por aqui?"
        text="Crie uma conta"
        href="/register"
      />

      <form onSubmit={handleSubmit} className="mt-[60px] flex flex-col gap-4">
        <fieldset>
          <Input
            type="email"
            placeholder="E-mail"
            error={errors.email?.message}
            {...register('email')}
          />
        </fieldset>

        <fieldset>
          <Input
            type="password"
            placeholder="Senha"
            error={errors.password?.message}
            {...register('password')}
          />
        </fieldset>

        <Button type="submit" className="mt-2" isLoading={isLoading}>
          Entrar
        </Button>
      </form>
    </>
  );
}
