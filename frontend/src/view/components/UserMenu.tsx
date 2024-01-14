import { ExitIcon } from '@radix-ui/react-icons';
import useAuth from '../../app/hooks/useAuth';
import { DropdownMenu } from './DropdownMenu';

export function UserMenu() {
  const { signout } = useAuth();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="bg-teal-50 p-3 rounded-full">
          <span className="text-sm tracking-[-0.5px] text-teal-900 font-medium">
            MA
          </span>
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-32">
        <DropdownMenu.Item
          onSelect={signout}
          className="flex justify-between items-center"
        >
          Sair
          <ExitIcon />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
