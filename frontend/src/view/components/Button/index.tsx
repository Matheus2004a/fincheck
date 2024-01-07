import { ComponentProps } from 'react';

interface ButtonProps extends ComponentProps<'button'> { }

export function Button({ type, children, ...props }: ButtonProps) {
  return (
    <button
      type={type}
      {...props}
      className="bg-teal-900 hover:bg-teal-800 rounded-2xl h-[48px] text-white font-medium
      transition-all disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}
