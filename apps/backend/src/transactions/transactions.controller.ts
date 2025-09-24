import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import { CreateTransactionRequestDto, UpdateTransactionStatusDto } from '@point-system/shared';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Transactions')
@Controller('transactions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new transaction request' })
  @ApiResponse({ status: 201, description: 'Transaction request created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createTransactionRequestDto: CreateTransactionRequestDto) {
    return this.transactionsService.createTransactionRequest(createTransactionRequestDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all transactions' })
  @ApiResponse({ status: 200, description: 'Transactions retrieved successfully' })
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get('pending')
  @ApiOperation({ summary: 'Get pending transactions' })
  @ApiResponse({ status: 200, description: 'Pending transactions retrieved successfully' })
  findPending() {
    return this.transactionsService.findPending();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get transaction by ID' })
  @ApiResponse({ status: 200, description: 'Transaction retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Transaction not found' })
  findOne(@Param('id') id: string) {
    return this.transactionsService.findById(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update transaction status' })
  @ApiResponse({ status: 200, description: 'Transaction status updated successfully' })
  @ApiResponse({ status: 404, description: 'Transaction not found' })
  updateStatus(@Param('id') id: string, @Body() updateDto: UpdateTransactionStatusDto) {
    return this.transactionsService.updateTransactionStatus(id, updateDto);
  }
}
