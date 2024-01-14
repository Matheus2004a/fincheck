import * as RdxDropdownMenu from '@radix-ui/react-dropdown-menu';
import { cn } from '../../app/utils/cn';

interface DropdownProps {
  children: React.ReactNode;
  className?: string;
  side?: string;
  onSelect?(): void;
}

function DropdownMenuRoot({ children }: { children: React.ReactNode }) {
  return (
    <RdxDropdownMenu.Root>
      {children}
    </RdxDropdownMenu.Root>
  );
}

function DropdownMenuTrigger({ children }: { children: React.ReactNode }) {
  return (
    <RdxDropdownMenu.Trigger>
      {children}
    </RdxDropdownMenu.Trigger>
  );
}

function DropdownMenuContent({ children, className }: DropdownProps) {
  return (
    <RdxDropdownMenu.Portal>
      <RdxDropdownMenu.Content
        className={cn(
          'rounded-2xl bg-white p-2 space-y-2 z-50 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]',
          'data-[side=bottom]:animate-slide-up-and-fade',
          'data-[side=top]:animate-slide-down-and-fade',
          className,
        )}
      >
        {children}
      </RdxDropdownMenu.Content>
    </RdxDropdownMenu.Portal>
  );
}

function DropdownMenuItem({ children, className, onSelect }: DropdownProps) {
  return (
    <RdxDropdownMenu.Item
      onSelect={onSelect}
      className={cn(
        'min-h-[48px] flex items-center p-2 text-gray-800 text-sm cursor-pointer',
        className,
      )}
    >
      {children}
    </RdxDropdownMenu.Item>
  );
}

export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
};
