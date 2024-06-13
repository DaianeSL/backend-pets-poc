import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export enum Roles {
  ONG = 'ong',
  ADMIN = 'admin',
  USER = 'user',
}
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsStrongPassword({ minLength: 8 })
  password: string;

  @IsString()
  @IsOptional()
  displayName?: string;

  @IsOptional()
  role?: Roles;
}
