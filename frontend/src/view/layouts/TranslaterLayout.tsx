import { Outlet } from 'react-router-dom';
import useLanguage from '../../app/hooks/useLanguage';
import { cn } from '../../app/utils/cn';
import { Button } from '../components/Button';

export function TranslaterLayout() {
  const { currentLanguage, handleChangeLanguage } = useLanguage();

  return (
    <>
      <aside className="flex gap-3 min-w-[200px] absolute top-2 left-2">
        <Button
          type="button"
          className={cn(
            'w-full bg-green-600 hover:bg-green-700',
            currentLanguage === 'pt-BR' && 'bg-green-950/80',
          )}
          onClick={() => handleChangeLanguage('pt-BR')}
        >
          Brasil
        </Button>
        <Button
          type="button"
          className={cn(
            'w-full bg-blue-600 hover:bg-blue-700',
            currentLanguage === 'en' && 'bg-blue-950/80',
          )}
          onClick={() => handleChangeLanguage('en')}
        >
          EUA
        </Button>
      </aside>

      <Outlet />
    </>
  );
}
