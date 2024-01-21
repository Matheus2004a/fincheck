import * as RdxDialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { cn } from '../../app/utils/cn';

interface ModalProps {
  open: boolean;
  title: string;
  rightAction?: React.ReactNode;
  children: React.ReactNode;
  onClose?(): void;
}

export function Modal({
  open, title, rightAction, onClose, children,
}: ModalProps) {
  return (
    <RdxDialog.Root open={open} onOpenChange={onClose}>
      <RdxDialog.Portal>
        <RdxDialog.Overlay className={cn(
          'fixed inset-0 bg-black/80 backdrop-blur-sm z-40',
          'data-[state=open]:animate-overlay-show',
        )}
        />
        <RdxDialog.Content className={cn(
          'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 p-6 rounded-2xl space-y-10',
          'bg-white w-full max-w-[400px] shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]',
          'data-[state=open]:animate-content-show',
        )}
        >
          <header className="h-12 flex justify-between items-center text-gray-800">
            <button
              type="button"
              className="w-12 h-12"
              onClick={onClose}
            >
              <Cross2Icon className="w-6 h-6" />
            </button>

            <span className="text-lg font-bold">
              {title}
            </span>

            <div className="w-12 h-12">
              {rightAction}
            </div>
          </header>

          <article>
            {children}
          </article>
        </RdxDialog.Content>
      </RdxDialog.Portal>
    </RdxDialog.Root>
  );
}
