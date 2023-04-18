import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { Roles, UserStatus } from '../database/entities/user.entity'
import { LoginEmailDTO } from '../dto/validation/login-email'
import { hashWithAppKey } from '../utils'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post('/login')
  async login(@Body() loginDTO: LoginEmailDTO) {
    const { email, password } = loginDTO
    const data = await this.authService.loginWithEmail(email, password)
    return { success: true, data }
  }

  @Post('/register')
  async register() {
    await this.authService.register(
      {
        name: 'Kevin',
        email: 'kevinportugalmx@gmail.com',
        password: hashWithAppKey('password'),
        role: Roles.ADMIN,
        status: UserStatus.ACTIVE,
      },
      {
        firstName: 'Kevin',
        lastName: 'Portugal',
        phone: '6682524909',
      }
    )
    return { success: true }
  }
}
