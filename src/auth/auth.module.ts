import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { config } from '../config'
import { Profile } from '../database/entities/profile.entity'
import { User } from '../database/entities/user.entity'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile]),
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: config.JwtSecret,
          signOptions: {
            expiresIn: config.JwtExpiresIn,
          },
        }
      },
      inject: [],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
