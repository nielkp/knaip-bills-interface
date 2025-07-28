import type { MonthlyItem, Transaction, TransactionFilter, TransactionSummary } from "../types/transactions";
import { api } from "./api";

export const getTransactions = async (
  filter?: Partial<TransactionFilter>,
): Promise<Transaction[]> => {
  const response = await api.get<Transaction[]>("/transactions", {
    params: filter
  });

  return response.data;
};

export const getTransactionsSummary = async (
  month: number,
  year: number,
): Promise<TransactionSummary> => {
  const response = await api.get<TransactionSummary>("/transactions/summary", {
    params: { month, year },
  });
  return response.data;
};

export const getTransactionsMonthly = async (
  month: number,
  year: number,
  months?: number,
): Promise<{ history: MonthlyItem[] }> => {
  const response = await api.get("/transactions/history", {
    params: {
      month,
      year,
      months,
    },
  });

  return response.data
}