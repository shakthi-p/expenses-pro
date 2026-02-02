export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  name: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string; // ISO string
}

export interface SummaryData {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
}

export interface CategoryOption {
  value: string;
  label: string;
  type: TransactionType | 'both';
}