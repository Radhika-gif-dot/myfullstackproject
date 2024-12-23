import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    username: string,
    password: string,
    email: string,
    profilePhoto: string,
  ): Promise<{
    data: { access_token: string; username: string ; email: string; profilePhoto: string };
    result: string;
    message: string;
  }> {
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('Email is already in use');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({
      username,
      password: hashedPassword,
      email,
      profilePhoto,
    });
    await user.save();
    const payload = { email: user.email, sub: user._id };
    const accessToken = this.jwtService.sign(payload);
    return {
      data: {
        access_token: accessToken,
        username: user.username,
        email: user.email,
        profilePhoto: user.profilePhoto,
      },
      result: 'success',
      message: 'Registration successful',
    };
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user._id };
    const accessToken = this.jwtService.sign(payload);
    return {
      data: {
        access_token: accessToken,
        username: user.username,
        email: user.email,
        profilePhoto : user.profilePhoto
      },
      result: 'success',
      message: 'Login successful',
    };
  }
}
