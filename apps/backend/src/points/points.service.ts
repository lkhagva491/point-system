import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Point, PointDocument } from './schemas/point.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class PointsService {
  constructor(
    @InjectModel(Point.name) private pointModel: Model<PointDocument>,
    private usersService: UsersService,
  ) {}

  async getUserPoints(userId: string): Promise<number> {
    const user = await this.usersService.findById(userId);
    return user.point || 0;
  }

  async createOrUpdateUserPoints(userId: string, balance: number, totalEarned: number, totalSpent: number): Promise<PointDocument> {
    const existingPoint = await this.pointModel.findOne({ userId });
    
    if (existingPoint) {
      return this.pointModel.findByIdAndUpdate(
        existingPoint._id,
        { balance, totalEarned, totalSpent, updatedAt: new Date() },
        { new: true }
      );
    } else {
      const newPoint = new this.pointModel({
        userId,
        balance,
        totalEarned,
        totalSpent,
      });
      return newPoint.save();
    }
  }

  async getUserPointSummary(userId: string): Promise<PointDocument | null> {
    let pointSummary = await this.pointModel.findOne({ userId });
    
    if (!pointSummary) {
      const userPoints = await this.getUserPoints(userId);
      const newPointSummary = await this.createOrUpdateUserPoints(userId, userPoints, 0, 0);
      return newPointSummary;
    }
    
    return pointSummary;
  }

  async updateUserBalance(userId: string, newBalance: number): Promise<PointDocument> {
    const pointSummary = await this.pointModel.findOne({ userId });
    
    if (pointSummary) {
      pointSummary.balance = newBalance;
      pointSummary.updatedAt = new Date();
      return pointSummary.save();
    } else {
      return this.createOrUpdateUserPoints(userId, newBalance, 0, 0);
    }
  }
}
