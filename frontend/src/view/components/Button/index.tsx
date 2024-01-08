import { ComponentProps } from 'react';
import { cn } from '../../../app/utils/cn';

interface ButtonProps extends ComponentProps<'button'> { }

export function Button({
  type, className, children, ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      {...props}
      className={cn(
        'bg-teal-900 hover:bg-teal-800 rounded-2xl h-[48px] text-white font-medium transition disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed',
        className,
      )}
    >
      {children}
    </button>
  );
}
