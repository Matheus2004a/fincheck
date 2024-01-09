import useAuth from '../../../app/hooks/useAuth';
import { Button } from '../../components/Button';

export function Dashboard() {
  const { signout } = useAuth();

  return (
    <>
      <h1>Page Dashboard</h1>

      <Button type="button" onClick={signout}>
        Sair
      </Button>
    </>
  );
}
