import { Button } from './Button';
import { Modal } from './Modal';
import { TrashIcon } from './icons/TrashIcon';

interface ConfirmDeleteModalProps {
  title: string;
  description?: string;
  isLoading: boolean;
  onClose(): void;
  onConfirm(): void;
}

export function ConfirmDeleteModal({
  title, description, isLoading, onClose, onConfirm,
}: ConfirmDeleteModalProps) {
  return (
    <Modal
      title="Excluir"
      open
      onClose={onClose}
    >
      <section className="flex flex-col justify-center items-center gap-6">
        <TrashIcon className="w-12 h-12 bg-red-50 text-red-900 p-3 rounded-full" />

        <p className="text-center font-bold max-w-[180px]">
          {title}
        </p>

        {description && (
          <p className="text-center text-gray-800">
            {description}
          </p>
        )}
      </section>

      <div className="mt-10 space-y-4">
        <Button
          className="w-full"
          variant="danger"
          onClick={onConfirm}
          isLoading={isLoading}
        >
          Sim, desejo excluir
        </Button>

        <Button
          className="w-full"
          variant="ghost"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancelar
        </Button>
      </div>
    </Modal>
  );
}
