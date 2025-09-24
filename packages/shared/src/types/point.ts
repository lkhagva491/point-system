export interface Point {
  _id: string;
  userId: string;
  balance: number;
  totalEarned: number;
  totalSpent: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  _id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  description: string;
  balanceAfter: number;
  createdAt: Date;
}

export enum TransactionType {
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
  ADJUSTMENT = 'adjustment',
}

export interface CreateTransactionDto {
  userId: string;
  type: TransactionType;
  amount: number;
  description: string;
}

export interface PointSummary {
  userId: string;
  balance: number;
  totalEarned: number;
  totalSpent: number;
  recentTransactions: Transaction[];
}

// Updated transaction schema to match your database
export interface TransactionRequest {
  _id: string;
  userId: string;
  points: number;
  type: TransactionType;
  status: TransactionStatus;
  requestedAmount: number;
  approvedByAdminId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum TransactionStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  DECLINED = 'declined',
}

export interface CreateTransactionRequestDto {
  userId: string;
  points: number;
  type: TransactionType;
  requestedAmount: number;
}

export interface UpdateTransactionStatusDto {
  status: TransactionStatus;
  approvedByAdminId?: string;
}
