import { ComponentProps } from 'react';
import { cn } from '../../../app/utils/cn';
import { Spinner } from '../Spinner';

interface ButtonProps extends ComponentProps<'button'> {
  isLoading?: boolean;
}

export function Button({
  type, className, isLoading, disabled, children, ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      {...props}
      className={cn(
        'bg-teal-900 hover:bg-teal-800 rounded-2xl h-[48px] text-white font-medium transition disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center justify-center',
        className,
      )}
    >
      {isLoading ? <Spinner className="w-6 h-6" /> : children}
    </button>
  );
}
