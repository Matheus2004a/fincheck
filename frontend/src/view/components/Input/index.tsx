import { ComponentProps } from 'react';

interface InputProps extends ComponentProps<'input'> {
  name: string;
}

export function Input({
  placeholder, name, id, ...props
}: InputProps) {
  const inputId = id ?? name;

  return (
    <div className="relative">
      <input
        {...props}
        name={inputId}
        id="input"
        className="w-full rounded-lg pt-4 border-gray-500 border px-3 h-[52px]
        text-gray-800 peer placeholder-shown:pt-0 focus:border-gray-800 transition-all outline-none"
        placeholder=""
      />

      <label
        htmlFor={inputId}
        className="absolute text-xs top-2 left-[13px] pointer-events-none text-gray-700
        peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all"
      >
        {placeholder}
      </label>
    </div>
  );
}
