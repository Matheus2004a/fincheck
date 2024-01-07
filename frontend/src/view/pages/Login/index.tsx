import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';

export function Login() {
  return (
    <>
      <Header
        title="Entre em sua conta"
        subtitle="Novo por aqui?"
        text="Crie uma conta"
        href="/register"
      />

      <form className="mt-[60px] flex flex-col gap-4">
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

        <Button type="submit">Entrar</Button>
      </form>
    </>
  );
}
