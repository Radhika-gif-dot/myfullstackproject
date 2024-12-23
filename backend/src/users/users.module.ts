import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModelName, UserSchema } from './user.schema';
import { UsersService } from './users.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserModelName, schema: UserSchema }])],
  providers: [UsersService],
  exports: [UsersService, MongooseModule], // Export MongooseModule to make UserModel available
})
export class UsersModule {}
