import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PointDocument = Point & Document;

@Schema({ timestamps: true, collection: 'points' })
export class Point {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, default: 0 })
  balance: number;

  @Prop({ required: true, default: 0 })
  totalEarned: number;

  @Prop({ required: true, default: 0 })
  totalSpent: number;

  @Prop()
  lastTransactionDate?: Date;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const PointSchema = SchemaFactory.createForClass(Point);