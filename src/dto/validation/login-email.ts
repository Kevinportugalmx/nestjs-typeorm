import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class LoginEmailDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string
  @IsNotEmpty()
  @IsString()
  password: string
}
