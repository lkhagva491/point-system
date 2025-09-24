import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AdminsService } from '../admins/admins.service';
import { LoginDto, AuthResponse, CreateUserDto, UserRole } from '@point-system/shared';
import { UserDocument } from '../users/schemas/user.schema';
import { AdminDocument } from '../admins/schemas/admin.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private adminsService: AdminsService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    // First check if it's an admin
    const admin = await this.adminsService.findByEmail(email) as AdminDocument;
    if (admin && await bcrypt.compare(password, admin.password)) {
      // Check if admin is active
      if (!admin.isActive) {
        throw new UnauthorizedException('Admin account is inactive');
      }
      const { password: _, ...result } = admin.toObject();
      return result;
    }

    // Then check if it's a regular user
    const user = await this.usersService.findByEmail(email) as UserDocument;
    if (user && await bcrypt.compare(password, user.password)) {
      // Check if user is active
      if (!user.isActive) {
        throw new UnauthorizedException('User account is inactive');
      }
      const { password: _, ...result } = user.toObject();
      return result;
    }

    return null;
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: (user as any)._id?.toString(), role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      user: {
        _id: (user as any)._id?.toString(),
        username: user.username,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        isActive: user.isActive,
        permissions: user.permissions,
        point: user.point,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      token,
    };
  }

  async register(createUserDto: CreateUserDto): Promise<AuthResponse> {
    let user;
    
    // Check if the role is admin, then register in admins table
    if (createUserDto.role === UserRole.ADMIN) {
      user = await this.adminsService.create(createUserDto);
    } else {
      // Default to user role and register in users table
      user = await this.usersService.create(createUserDto);
    }

    const payload = { email: user.email, sub: (user as any)._id?.toString(), role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      user: {
        _id: (user as any)._id?.toString(),
        username: user.username,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        isActive: user.isActive,
        permissions: user.permissions,
        point: user.point || 0, // Admins might not have point field
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      token,
    };
  }
}
