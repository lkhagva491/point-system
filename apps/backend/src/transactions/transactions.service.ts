import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from './schemas/transaction.schema';
import { CreateTransactionRequestDto, UpdateTransactionStatusDto, TransactionStatus } from '@point-system/shared';
import { PointsService } from '../points/points.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
    @Inject(forwardRef(() => PointsService)) private pointsService: PointsService,
    private usersService: UsersService,
  ) {}

  async createTransactionRequest(createTransactionRequestDto: CreateTransactionRequestDto): Promise<Transaction> {
    const { userId, points, type, requestedAmount } = createTransactionRequestDto;
    
    const transaction = new this.transactionModel({
      userId,
      points,
      type,
      requestedAmount,
      status: TransactionStatus.PENDING,
    });

    return transaction.save();
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionModel.find().populate('userId', 'username email').exec();
  }

  async findPending(): Promise<Transaction[]> {
    return this.transactionModel.find({ status: TransactionStatus.PENDING }).populate('userId', 'username email').exec();
  }

  async findById(id: string): Promise<Transaction> {
    const transaction = await this.transactionModel.findById(id).populate('userId', 'username email').exec();
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return transaction;
  }

  async updateTransactionStatus(id: string, updateDto: UpdateTransactionStatusDto): Promise<Transaction> {
    const transaction = await this.transactionModel.findByIdAndUpdate(
      id,
      { 
        status: updateDto.status, 
        updatedAt: new Date(),
        ...(updateDto.status === TransactionStatus.APPROVED && { approvedByAdminId: 'admin' }) // TODO: Get actual admin ID
      },
      { new: true },
    ).populate('userId', 'username email').exec();

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    // If transaction is approved, update user points
    if (updateDto.status === TransactionStatus.APPROVED) {
      const user = await this.usersService.findById(transaction.userId.toString());
      let newBalance = user.point || 0;

      if (transaction.type === 'deposit') {
        newBalance += transaction.points;
      } else if (transaction.type === 'withdrawal') {
        newBalance -= transaction.points;
        // Ensure balance doesn't go negative
        if (newBalance < 0) {
          newBalance = 0;
        }
      }

      // Update user's point balance
      await this.usersService.update(transaction.userId.toString(), { point: newBalance });
      
      // Update points summary
      await this.pointsService.updateUserBalance(transaction.userId.toString(), newBalance);
    }

    return transaction;
  }

  async findByUser(userId: string): Promise<Transaction[]> {
    return this.transactionModel.find({ userId }).sort({ createdAt: -1 }).exec();
  }

  async getTransactionsByUserId(userId: string): Promise<Transaction[]> {
    return this.transactionModel.find({ userId }).sort({ createdAt: -1 }).exec();
  }
}
