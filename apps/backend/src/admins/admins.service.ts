import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from './schemas/admin.schema';
import { CreateUserDto, UpdateUserDto } from '@point-system/shared';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AdminsService {
  constructor(@InjectModel(Admin.name) private adminModel: Model<Admin>) {}

  async create(createUserDto: CreateUserDto): Promise<Admin> {
    const existingAdmin = await this.adminModel.findOne({
      $or: [
        { email: createUserDto.email },
        { username: createUserDto.username },
      ],
    });

    if (existingAdmin) {
      throw new ConflictException('Admin with this email or username already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const createdAdmin = new this.adminModel({
      ...createUserDto,
      password: hashedPassword,
      role: 'admin',
      isActive: false, // New admins are inactive by default
    });

    return createdAdmin.save();
  }

  async findAll(): Promise<Admin[]> {
    return this.adminModel.find().select('-password').exec();
  }

  async findById(id: string): Promise<Admin> {
    const admin = await this.adminModel.findById(id).select('-password').exec();
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    return admin;
  }

  async findByEmail(email: string): Promise<Admin> {
    return this.adminModel.findOne({ email }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<Admin> {
    // Prevent role changes
    if (updateUserDto.role) {
      delete updateUserDto.role;
    }

    const admin = await this.adminModel.findByIdAndUpdate(
      id,
      { ...updateUserDto, updatedAt: new Date() },
      { new: true },
    ).select('-password').exec();

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    return admin;
  }

  async remove(id: string, currentUserId?: string): Promise<void> {
    // Prevent admin from deleting themselves
    if (currentUserId && currentUserId === id) {
      throw new ConflictException('You cannot delete your own account');
    }

    // Check if this is the last admin
    const adminCount = await this.adminModel.countDocuments({ isActive: true });
    if (adminCount <= 1) {
      throw new ConflictException('Cannot delete the last active admin');
    }

    const result = await this.adminModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Admin not found');
    }
  }
}
