import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import * as RdxSelect from '@radix-ui/react-select';
import useLanguage from '../../app/hooks/useLanguage';
import { cn } from '../../app/utils/cn';
import flagBr from '../../assets/images/flag-brasil.png';
import flagEUA from '../../assets/images/flag-eua.png';

export function SelectFlags() {
  const { currentLanguage, handleChangeLanguage } = useLanguage();

  return (
    <RdxSelect.Root onValueChange={handleChangeLanguage}>
      <RdxSelect.Trigger
        className={cn(
          'w-full rounded-lg border-gray-500 border px-3 h-[52px] text-gray-800 focus:border-gray-800 transition-all outline-none',
          'text-left relative bg-white',
        )}
      >
        <RdxSelect.Value placeholder={currentLanguage === 'en'
          ? <img src={flagEUA} alt="EUA" className="w-[30px] h-[30px]" />
          : <img src={flagBr} alt="Brasil" className="w-[30px] h-[30px]" />}
        />

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

          <RdxSelect.Viewport className="flex flex-col gap-1 p-2">
            <RdxSelect.Item value="pt-BR">
              <RdxSelect.ItemText>
                <img src={flagBr} alt="Brasil" className="w-[30px] h-[30px]" />
              </RdxSelect.ItemText>
            </RdxSelect.Item>
            <RdxSelect.Item value="en">
              <RdxSelect.ItemText>
                <img src={flagEUA} alt="EUA" className="w-[30px] h-[30px]" />
              </RdxSelect.ItemText>
            </RdxSelect.Item>
          </RdxSelect.Viewport>

          <RdxSelect.ScrollDownButton
            className="flex items-center justify-center h-[25px] bg-white text-gray-800 cursor-default"
          >
            <ChevronDownIcon />
          </RdxSelect.ScrollDownButton>
        </RdxSelect.Content>
      </RdxSelect.Portal>
    </RdxSelect.Root>
  );
}
