// auth.controller.ts
import { Controller, Post, Body, UseGuards, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/create-user.dto';
import { LoginDto } from '../users/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    if (createUserDto.profilePhoto) {
      createUserDto.profilePhoto = createUserDto.profilePhoto.replace(/^data:image\/\w+;base64,/, '');
    } else {
      throw new BadRequestException('Profile photo is required');
    }

    return this.authService.register(
      createUserDto.username,
      createUserDto.password,
      createUserDto.email,
      createUserDto.profilePhoto,
    );
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    return this.authService.login(user);
  }
}
