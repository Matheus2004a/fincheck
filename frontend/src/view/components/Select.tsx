import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import * as RdxSelect from '@radix-ui/react-select';
import { useState } from 'react';
import { cn } from '../../app/utils/cn';
import { Errors } from './Errors';

interface SelectProps {
  className?: string;
  error?: string;
  placeholder?: string;
  options: {
    value: string;
    label: string;
  }[];
  value?: string;
  onChange(value: string): void;
}

export function Select({
  className, error, placeholder, options, value, onChange,
}: SelectProps) {
  const [selectedValue, setSelectedValue] = useState(value);

  function handleSelect(newValue: string) {
    setSelectedValue(newValue);
    onChange(newValue);
  }

  return (
    <div className="relative">
      <label
        htmlFor="select"
        className={cn(
          'absolute top-1/2 left-3 -translate-y-1/2 pointer-events-none text-gray-700',
          selectedValue && 'text-xs top-2 left-[13px] transition-all translate-y-0',
        )}
      >
        {placeholder}
      </label>

      <RdxSelect.Root value={value} onValueChange={handleSelect}>
        <RdxSelect.Trigger
          className={cn(
            'w-full rounded-lg pt-4 border-gray-500 border px-3 h-[52px] text-gray-800 focus:border-gray-800 transition-all outline-none',
            'text-left relative',
            error && '!border-red-900',
            className,
          )}
        >
          <RdxSelect.Value />

          <RdxSelect.Icon className="absolute right-3 top-1/2 -translate-y-1/2">
            <ChevronDownIcon className="w-6 h-6 text-gray-800" />
          </RdxSelect.Icon>
        </RdxSelect.Trigger>

        <RdxSelect.Portal>
          <RdxSelect.Content className="z-[60] overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]">
            <RdxSelect.ScrollUpButton
              className="flex items-center justify-center h-[25px] bg-white text-gray-800 cursor-default"
            >
              <ChevronUpIcon />
            </RdxSelect.ScrollUpButton>

            <RdxSelect.Viewport className="p-2">
              {options.map((option) => (
                <RdxSelect.Item
                  key={option.value}
                  value={option.value}
                  className="p-2 text-gray-800 text-sm data-[state=checked]:font-bold data-[highlighted]:bg-gray-50 rounded-lg"
                >
                  <RdxSelect.ItemText>
                    {option.label}
                  </RdxSelect.ItemText>
                </RdxSelect.Item>
              ))}
            </RdxSelect.Viewport>

            <RdxSelect.ScrollDownButton
              className="flex items-center justify-center h-[25px] bg-white text-gray-800 cursor-default"
            >
              <ChevronDownIcon />
            </RdxSelect.ScrollDownButton>
          </RdxSelect.Content>
        </RdxSelect.Portal>
      </RdxSelect.Root>

      <Errors error={error} />
    </div>
  );
}
