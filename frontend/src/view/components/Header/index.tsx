import { Link } from 'react-router-dom';

interface HeaderProps {
  title: string;
  subtitle: string;
  text: string;
  href: string;
}

export function Header({
  title, subtitle, text, href,
}: HeaderProps) {
  return (
    <header className="flex flex-col items-center gap-4 text-center">
      <h1 className="text-2xl text-gray-900 font-bold">{title}</h1>
      <p className="space-x-2 tracking-[-0.5px]">
        <span className="text-gray-900">{subtitle}</span>
        <Link to={href} className="text-teal-900 font-medium">{text}</Link>
      </p>
    </header>
  );
}
