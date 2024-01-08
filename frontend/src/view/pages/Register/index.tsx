import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import useRegister from './useRegister';

export function Register() {
  const { handleSubmit, errors, register } = useRegister();

  return (
    <>
      <Header
        title="Crie sua conta"
        subtitle="Já possui uma conta?"
        text="Fazer Login"
        href="/login"
      />

      <form onSubmit={handleSubmit} className="mt-[60px] flex flex-col gap-4">
        <fieldset>
          <Input
            type="text"
            placeholder="Nome"
            error={errors.name?.message}
            {...register('name')}
          />
        </fieldset>

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

        <Button type="submit" className="mt-2">Criar conta</Button>
      </form>
    </>
  );
}
