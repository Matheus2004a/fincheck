import { Logo } from '../../components/Logo';
import { UserMenu } from '../../components/UserMenu';
import { Accounts } from './components/Accounts';
import { Fab } from './components/Fab';
import { Transactions } from './components/Transactions';
import { DashboardContext, DashboardProvider } from './contexts/DashboardContext';
import { EditAccountModal } from './modals/EditAccountModal';
import { NewAccountModal } from './modals/NewAccountModal';
import { NewTransactionModal } from './modals/NewTransactionModal';

export function Dashboard() {
  return (
    <DashboardProvider>
      <DashboardContext.Consumer>
        {({ accountBeingEdited }) => (
          <>
            <div className="w-full h-full p-4 md:px-8 md:pt-6 md:pb-8 flex flex-col gap-4">
              <header className="h-12 flex justify-between items-center">
                <Logo className="text-teal-900" />
                <UserMenu />
              </header>

              <main className="flex flex-1 flex-col md:flex-row justify-between gap-4 max-h-full">
                <Accounts />
                <Transactions />
              </main>

              <Fab />
            </div>

            <NewAccountModal />
            {accountBeingEdited && <EditAccountModal />}
            <NewTransactionModal />
          </>
        )}
      </DashboardContext.Consumer>
    </DashboardProvider>
  );
}
