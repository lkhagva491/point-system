import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PointsService } from './points.service';
import { TransactionsService } from '../transactions/transactions.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Points')
@Controller('points')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PointsController {
  constructor(
    private readonly pointsService: PointsService,
    private readonly transactionsService: TransactionsService,
  ) {}

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get points for a user' })
  @ApiResponse({ status: 200, description: 'Points retrieved successfully' })
  async getUserPoints(@Param('userId') userId: string) {
    const points = await this.pointsService.getUserPoints(userId);
    return { userId, points };
  }

  @Get('user/:userId/summary')
  @ApiOperation({ summary: 'Get point summary for a user' })
  @ApiResponse({ status: 200, description: 'Point summary retrieved successfully' })
  async getUserPointSummary(@Param('userId') userId: string) {
    return this.pointsService.getUserPointSummary(userId);
  }

  @Get('user/:userId/transactions')
  @ApiOperation({ summary: 'Get transactions for a user' })
  @ApiResponse({ status: 200, description: 'Transactions retrieved successfully' })
  async getUserTransactions(@Param('userId') userId: string) {
    return this.transactionsService.getTransactionsByUserId(userId);
  }

  @Post('transaction-request')
  @ApiOperation({ summary: 'Create a transaction request' })
  @ApiResponse({ status: 201, description: 'Transaction request created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createTransactionRequest(@Body() createTransactionRequestDto: any) {
    return this.transactionsService.createTransactionRequest(createTransactionRequestDto);
  }

  @Get('transactions')
  @ApiOperation({ summary: 'Get all transactions' })
  @ApiResponse({ status: 200, description: 'Transactions retrieved successfully' })
  async getAllTransactions() {
    return this.transactionsService.findAll();
  }
}
