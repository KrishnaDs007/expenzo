// Expense type definitions

export type Category =
  | 'Food'
  | 'Travel'
  | 'Auto'
  | 'Shopping'
  | 'Entertainment'
  | 'Utilities'
  | 'Health'
  | 'Other';

export type PaymentMethod =
  | 'Cash'
  | 'UPI'
  | 'GPay'
  | 'PhonePe'
  | 'Card'
  | 'Other';

export type SplitType = 'none' | 'equal' | 'custom';

export interface Expense {
  id: string;
  userId: string;
  groupId?: string;
  amount: number;
  description: string;
  category: Category;
  date: string;
  paymentMethod: PaymentMethod;
  rawInput?: string;
  aiParsed?: string;
  createdAt: string;
}

export interface ParsedExpenseResult {
  amount: number;
  description: string;
  category: Category;
  date: string;
  paymentMethod: PaymentMethod;
  paidBy: string;
  splitWith: string[];
  splitType: SplitType;
  confidence: number;
}

export interface Split {
  id: string;
  expenseId: string;
  userId: string;
  amount: number;
  settled: boolean;
}

export interface Group {
  id: string;
  name: string;
  createdBy: string;
  createdAt: string;
}
