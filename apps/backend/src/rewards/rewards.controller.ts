import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RewardsService } from './rewards.service';
import { CreateRewardDto, UpdateRewardDto, CreateRedemptionDto, RedemptionStatus } from '@point-system/shared';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Rewards')
@Controller('rewards')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new reward' })
  @ApiResponse({ status: 201, description: 'Reward created successfully' })
  create(@Body() createRewardDto: CreateRewardDto) {
    return this.rewardsService.create(createRewardDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all rewards' })
  @ApiResponse({ status: 200, description: 'Rewards retrieved successfully' })
  findAll() {
    return this.rewardsService.findAll();
  }

  @Get('active')
  @ApiOperation({ summary: 'Get active rewards' })
  @ApiResponse({ status: 200, description: 'Active rewards retrieved successfully' })
  findActive() {
    return this.rewardsService.findActive();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get reward by ID' })
  @ApiResponse({ status: 200, description: 'Reward retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Reward not found' })
  findOne(@Param('id') id: string) {
    return this.rewardsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update reward' })
  @ApiResponse({ status: 200, description: 'Reward updated successfully' })
  @ApiResponse({ status: 404, description: 'Reward not found' })
  update(@Param('id') id: string, @Body() updateRewardDto: UpdateRewardDto) {
    return this.rewardsService.update(id, updateRewardDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete reward' })
  @ApiResponse({ status: 200, description: 'Reward deleted successfully' })
  @ApiResponse({ status: 404, description: 'Reward not found' })
  remove(@Param('id') id: string) {
    return this.rewardsService.remove(id);
  }

  @Post('redeem')
  @ApiOperation({ summary: 'Redeem a reward' })
  @ApiResponse({ status: 201, description: 'Reward redemption created successfully' })
  redeem(@Body() createRedemptionDto: CreateRedemptionDto) {
    return this.rewardsService.createRedemption(createRedemptionDto);
  }

  @Get('redemptions/user/:userId')
  @ApiOperation({ summary: 'Get redemptions for a user' })
  @ApiResponse({ status: 200, description: 'Redemptions retrieved successfully' })
  getUserRedemptions(@Param('userId') userId: string) {
    return this.rewardsService.getRedemptionsByUser(userId);
  }

  @Get('redemptions/all')
  @ApiOperation({ summary: 'Get all redemptions (admin only)' })
  @ApiResponse({ status: 200, description: 'Redemptions retrieved successfully' })
  getAllRedemptions() {
    return this.rewardsService.getAllRedemptions();
  }

  @Patch('redemptions/:id/status')
  @ApiOperation({ summary: 'Update redemption status' })
  @ApiResponse({ status: 200, description: 'Redemption status updated successfully' })
  updateRedemptionStatus(
    @Param('id') id: string,
    @Body('status') status: RedemptionStatus,
  ) {
    return this.rewardsService.updateRedemptionStatus(id, status);
  }
}

