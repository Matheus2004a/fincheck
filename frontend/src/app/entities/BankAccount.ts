export interface BankAccount {
  id: string,
  name: string,
  initialBalance: number,
  color: string,
  type: 'CHECKING' | 'INVESTMENT' | 'CASH';
  currentBalance: number;
}
