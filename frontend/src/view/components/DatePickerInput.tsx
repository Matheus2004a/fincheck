import { useState } from 'react';
import { cn } from '../../app/utils/cn';
import { formatDate } from '../../app/utils/formatDate';
import { DatePicker } from './DatePicker';
import { Errors } from './Errors';
import { Popover } from './Popover';

interface DatePickerInputProps {
  error?: string;
  className?: string;
  value: Date;
  onChange(date: Date): void;
}

export function DatePickerInput({
  className, error, value, onChange,
}: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState(value ?? new Date());

  function handleChangeDate(date:Date) {
    setSelectedDate(date);
    onChange(date);
  }

  return (
    <div>
      <Popover.Root>
        <Popover.Trigger>
          <button
            type="button"
            className={cn(
              'w-full rounded-lg border-gray-500 border px-3 h-[52px] text-gray-700 focus:border-gray-800 transition-all outline-none',
              'text-left relative pt-4',
              error && '!border-red-900',
              className,
            )}
          >
            <span className="absolute text-xs top-2 left-[13px] pointer-events-none">
              Data
            </span>
            <span>
              {formatDate(selectedDate)}
            </span>
          </button>
        </Popover.Trigger>

        <Popover.Content>
          <DatePicker
            value={selectedDate}
            onChange={handleChangeDate}
          />
        </Popover.Content>
      </Popover.Root>

      <Errors error={error} />
    </div>
  );
}
