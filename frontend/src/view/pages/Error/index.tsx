import { Link } from 'react-router-dom';
import pageNotFound from '../../../assets/page_not_found.svg';
import { Button } from '../../components/Button';

export function Error() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full h-full">
      <img
        src={pageNotFound}
        alt="page-not-found"
        className="w-1/2 h-1/2"
      />

      <p className="text-teal-800 text-lg">Página não encontrada</p>

      <Link to="/login">
        <Button type="button" className="px-4">Volte ao login</Button>
      </Link>
    </div>
  );
}
