export interface Reward {
  _id: string;
  name: string;
  description: string;
  pointsRequired: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateRewardDto {
  name: string;
  description: string;
  pointsRequired: number;
  isActive?: boolean;
}

export interface UpdateRewardDto {
  name?: string;
  description?: string;
  pointsRequired?: number;
  isActive?: boolean;
}

export interface RewardRedemption {
  _id: string;
  userId: string;
  rewardId: string;
  pointsUsed: number;
  status: RedemptionStatus;
  createdAt: Date;
  updatedAt: Date;
}

export enum RedemptionStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  COMPLETED = 'completed',
}

export interface CreateRedemptionDto {
  userId: string;
  rewardId: string;
}

