import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://newuser_31:EINq1KGWjrMaXlNV@cluster0.drn7n.mongodb.net/TASK-MANAGER?retryWrites=true&w=majority'
    ),
    TasksModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {
  constructor() {
    console.log('Connected to MongoDB Atlas');
  }
}
