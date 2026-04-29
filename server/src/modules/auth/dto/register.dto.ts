import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Невірний формат email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Пароль має бути не менше 6 символів' })
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
