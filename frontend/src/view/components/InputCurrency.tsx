import { NumericFormat } from 'react-number-format';
import { Errors } from './Errors';

interface InputCurrencyProps {
  error?: string;
  value?: string;
  onChange(value: string): void;
}

export function InputCurrency({ error, value, onChange }: InputCurrencyProps) {
  return (
    <div>
      <NumericFormat
        thousandSeparator="."
        decimalSeparator=","
        value={value}
        className="w-full text-[32px] font-bold outline-none"
        onChange={(event) => onChange(event.target.value)}
      />

      <Errors error={error} />
    </div>
  );
}
