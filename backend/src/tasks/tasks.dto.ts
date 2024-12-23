import { Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsDate,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'Title is required and cannot be empty.' })
  @IsString({ message: 'Title must be a string.' })
  @Length(3, 50, {
    message: 'Title must be between 3 and 50 characters long.',
  })
  title: string;

  @IsNotEmpty({ message: 'Description is required and cannot be empty.' })
  @IsString({ message: 'Description must be a string.' })
  @Length(1, 200, {
    message: 'Description must be between 1 and 200 characters long.',
  })
  description: string;

  @IsNotEmpty({ message: 'Status is required and cannot be empty.' })
  @IsEnum(['To Do', 'In Progress', 'Done'], {
    message: 'Status must be either "To Do", "In Progress", or "Done".',
  })
  status: string;

  @IsDate()
  @Transform(({ value }) => new Date(value), { toClassOnly: true }) 
  @Type(() => Date) 
  dueDate: Date;

}

export class UpdateTaskDto {
  @IsNotEmpty({ message: 'Title is required and cannot be empty.' })
  @IsString({ message: 'Title must be a string.' })
  @Length(3, 50, {
    message: 'Title must be between 3 and 50 characters long.',
  })
  title: string;
  @IsNotEmpty({ message: 'Description is required and cannot be empty.' })
  @IsString({ message: 'Description must be a string.' })
  @Length(1, 200, {
    message: 'Description must be between 1 and 200 characters long.',
  })
  description: string;

  @IsNotEmpty({ message: 'Status is required and cannot be empty.' })
  @IsEnum(['To Do', 'In Progress', 'Done'], {
    message: 'Status must be either "To Do", "In Progress", or "Done".',
  })
  status: string;

  @IsDate()
  @Transform(({ value }) => new Date(value), { toClassOnly: true }) 
  @Type(() => Date) 
  dueDate: Date;
}
