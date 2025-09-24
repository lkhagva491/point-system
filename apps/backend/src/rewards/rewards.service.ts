import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reward } from './schemas/reward.schema';
import { RewardRedemption } from './schemas/reward-redemption.schema';
import { CreateRewardDto, UpdateRewardDto, CreateRedemptionDto, RedemptionStatus } from '@point-system/shared';

@Injectable()
export class RewardsService {
  constructor(
    @InjectModel(Reward.name) private rewardModel: Model<Reward>,
    @InjectModel(RewardRedemption.name) private redemptionModel: Model<RewardRedemption>,
  ) {}

  async create(createRewardDto: CreateRewardDto): Promise<Reward> {
    const reward = new this.rewardModel(createRewardDto);
    return reward.save();
  }

  async findAll(): Promise<Reward[]> {
    return this.rewardModel.find().exec();
  }

  async findActive(): Promise<Reward[]> {
    return this.rewardModel.find({ isActive: true }).exec();
  }

  async findOne(id: string): Promise<Reward> {
    const reward = await this.rewardModel.findById(id).exec();
    if (!reward) {
      throw new NotFoundException('Reward not found');
    }
    return reward;
  }

  async update(id: string, updateRewardDto: UpdateRewardDto): Promise<Reward> {
    const reward = await this.rewardModel.findByIdAndUpdate(
      id,
      { ...updateRewardDto, updatedAt: new Date() },
      { new: true },
    ).exec();

    if (!reward) {
      throw new NotFoundException('Reward not found');
    }

    return reward;
  }

  async remove(id: string): Promise<void> {
    const result = await this.rewardModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Reward not found');
    }
  }

  async createRedemption(createRedemptionDto: CreateRedemptionDto): Promise<RewardRedemption> {
    const { userId, rewardId } = createRedemptionDto;
    
    const reward = await this.findOne(rewardId);
    
    const redemption = new this.redemptionModel({
      userId,
      rewardId,
      pointsUsed: reward.pointsRequired,
      status: RedemptionStatus.PENDING,
    });

    return redemption.save();
  }

  async getRedemptionsByUser(userId: string): Promise<RewardRedemption[]> {
    return this.redemptionModel
      .find({ userId })
      .populate('rewardId')
      .sort({ createdAt: -1 })
      .exec();
  }

  async getAllRedemptions(): Promise<RewardRedemption[]> {
    return this.redemptionModel
      .find()
      .populate('rewardId')
      .populate('userId', 'username email')
      .sort({ createdAt: -1 })
      .exec();
  }

  async updateRedemptionStatus(id: string, status: RedemptionStatus): Promise<RewardRedemption> {
    const redemption = await this.redemptionModel.findByIdAndUpdate(
      id,
      { status, updatedAt: new Date() },
      { new: true },
    ).populate('rewardId').exec();

    if (!redemption) {
      throw new NotFoundException('Redemption not found');
    }

    return redemption;
  }
}

