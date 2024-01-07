import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';

export function Register() {
  return (
    <>
      <Header
        title="Crie sua conta"
        subtitle="Já possui uma conta?"
        text="Fazer Login"
        href="/login"
      />

      <form className="mt-[60px] flex flex-col gap-4">
        <fieldset>
          <Input
            type="text"
            placeholder="Nome"
            name="name"
          />
        </fieldset>

        <fieldset>
          <Input
            type="email"
            placeholder="E-mail"
            name="email"
          />
        </fieldset>

        <fieldset>
          <Input
            type="password"
            placeholder="Senha"
            name="password"
          />
        </fieldset>

        <Button type="submit">Criar conta</Button>
      </form>
    </>
  );
}
