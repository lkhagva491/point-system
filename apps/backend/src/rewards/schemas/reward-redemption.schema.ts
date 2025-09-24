import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RedemptionStatus } from '@point-system/shared';

export type RewardRedemptionDocument = RewardRedemption & Document;

@Schema({ timestamps: true, collection: 'reward_redemptions' })
export class RewardRedemption {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  rewardId: string;

  @Prop({ required: true })
  pointsUsed: number;

  @Prop({ required: true, enum: RedemptionStatus, default: RedemptionStatus.PENDING })
  status: RedemptionStatus;

  @Prop()
  processedByAdminId?: string;

  @Prop()
  notes?: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const RewardRedemptionSchema = SchemaFactory.createForClass(RewardRedemption);