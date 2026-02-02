import { CategoryOption } from './types';

export const EXPENSE_CATEGORIES: CategoryOption[] = [
  { value: 'Food', label: 'Food & Dining', type: 'expense' },
  { value: 'Housing', label: 'Housing', type: 'expense' },
  { value: 'Transportation', label: 'Transportation', type: 'expense' },
  { value: 'Utilities', label: 'Utilities', type: 'expense' },
  { value: 'Entertainment', label: 'Entertainment', type: 'expense' },
  { value: 'Healthcare', label: 'Healthcare', type: 'expense' },
  { value: 'Shopping', label: 'Shopping', type: 'expense' },
  { value: 'Personal', label: 'Personal Care', type: 'expense' },
  { value: 'Other', label: 'Other', type: 'expense' },
];

export const INCOME_CATEGORIES: CategoryOption[] = [
  { value: 'Salary', label: 'Salary', type: 'income' },
  { value: 'Freelance', label: 'Freelance', type: 'income' },
  { value: 'Investments', label: 'Investments', type: 'income' },
  { value: 'Gifts', label: 'Gifts', type: 'income' },
  { value: 'Other', label: 'Other', type: 'income' },
];

export const ALL_CATEGORIES = [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES];