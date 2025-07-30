import type { Category, CategorySummary } from "./category";

export enum TransactionType {
  EXPENSE = 'expense',
  INCOME = 'income',
}

export interface Transaction {
  id: string;
  userId: string;
  description: string;
  amount: number;
  date: string | Date;
  categoryId: string;
  Category: Category;
  type: TransactionType;
  updatedAt: string | Date;
  createdAt: string | Date;
}

export interface CreateTransactionDTO { // DTO = Data Transfer Object!
  description: string;
  amount: number;
  date: Date | string;
  categoryId: number;
  type: TransactionType;
}

export interface TransactionFilter {
  month: number;
  year: number;
  categoryId?: string;
  type?: TransactionType;
}

export interface TransactionSummary {
  totalExpenses: number;
  totalIncomes: number;
  balance: number;
  expensesByCategory: CategorySummary[];
}

export interface MonthlyItem {
  name: string,
  income: number;
  expenses: number;
}