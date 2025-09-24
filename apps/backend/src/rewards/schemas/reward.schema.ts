import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RewardDocument = Reward & Document;

@Schema({ timestamps: true, collection: 'rewards' })
export class Reward {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  pointsRequired: number;

  @Prop({ required: true, default: true })
  isActive: boolean;

  @Prop()
  imageUrl?: string;

  @Prop()
  category?: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);