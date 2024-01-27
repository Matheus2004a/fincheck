import { Outlet } from 'react-router-dom';
import useLanguage from '../../app/hooks/useLanguage';
import { Button } from '../components/Button';

export function TranslaterLayout() {
  const { handleChangeLanguage } = useLanguage();

  return (
    <>
      <aside className="flex gap-3 min-w-[200px] absolute top-2 left-2">
        <Button
          type="button"
          className="w-full bg-green-600 hover:bg-green-700"
          onClick={() => handleChangeLanguage('pt-BR')}
        >
          Brasil
        </Button>
        <Button
          type="button"
          className="w-full bg-blue-600 hover:bg-blue-700"
          onClick={() => handleChangeLanguage('en')}
        >
          EUA
        </Button>
      </aside>

      <Outlet />
    </>
  );
}
