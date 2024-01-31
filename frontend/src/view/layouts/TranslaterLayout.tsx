import { Outlet } from 'react-router-dom';
import { SelectFlags } from '../components/SelectFlags';

export function TranslaterLayout() {
  return (
    <>
      <aside className="z-20 flex justify-center gap-3 min-w-[80px] absolute top-2 right-1/2">
        <SelectFlags />
      </aside>

      <Outlet />
    </>
  );
}
