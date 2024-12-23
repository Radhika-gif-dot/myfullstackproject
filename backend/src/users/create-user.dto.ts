import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsEmail,
  ValidateIf,
  Matches,
  IsBase64,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty()
  email: string;

  @IsNotEmpty({ message: 'Profile photo is required' })
  @ValidateIf(o=> o.profilePhoto)
  @Matches(/^data:image\/(jpeg|jpg|png);base64,[A-Za-z0-9+/=]+$/, {
    message: 'Profile photo must be base64 encoded ',
  })
  profilePhoto: string;
}
