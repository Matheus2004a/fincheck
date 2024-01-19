import { ComponentProps, forwardRef } from 'react';
import { cn } from '../../../app/utils/cn';
import { Errors } from '../Errors';

interface InputProps extends ComponentProps<'input'> {
  name: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  placeholder, name, id, className, error, ...props
}, ref) => {
  const inputId = id ?? name;

  return (
    <div className="relative">
      <input
        {...props}
        ref={ref}
        name={inputId}
        id={inputId}
        className={cn(
          'w-full rounded-lg pt-4 border-gray-500 border px-3 h-[52px] text-gray-800 peer placeholder-shown:pt-0 focus:border-gray-800 transition-all outline-none',
          error && '!border-red-900',
          className,
        )}
        placeholder=""
      />

      <label
        htmlFor={inputId}
        className="absolute text-xs top-2 left-[13px] pointer-events-none text-gray-700
        peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all"
      >
        {placeholder}
      </label>

      <Errors error={error} />
    </div>
  );
});
