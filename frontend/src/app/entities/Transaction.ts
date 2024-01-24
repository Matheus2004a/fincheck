export interface Transaction {
  id: string;
  name: string;
  value: number;
  type: 'INCOME' | 'EXPENSE';
  date: string;
  categoryId: string;
  bankAccountId: string;
  category?: {
    id: string;
    icon: string;
  }
}
