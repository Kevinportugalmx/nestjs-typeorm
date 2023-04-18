import { HttpException, Injectable } from '@nestjs/common'
import { config } from '../config'
import { JwtService } from '@nestjs/jwt'
import { TokenData } from '../types'
import { hashWithAppKey } from '../utils'
import { Repository } from 'typeorm'
import { User } from '../database/entities/user.entity'
import { Profile } from '../database/entities/profile.entity'
import { InjectRepository } from '@nestjs/typeorm'

export interface ITokenPayload {
  _id: string
  email: string
  profile: Profile
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,

    private jwtService: JwtService
  ) {}

  async register(
    user: Partial<User>,
    profile: Partial<Profile>
  ): Promise<User> {
    await this.profileRepository.save(profile)
    return await this.userRepository.save({
      ...user,
      profile,
    })
  }

  sign(payload: ITokenPayload) {
    return {
      token: this.jwtService.sign(payload),
    }
  }

  decodeToken(token: string) {
    const decode = this.jwtService.decode(token)
    return JSON.parse(JSON.stringify(decode))
  }

  async validateToken(token: string): Promise<void> {
    return await this.jwtService
      .verifyAsync(token, {
        secret: config.JwtSecret,
      })
      .catch(() => false)
  }

  async loginWithEmail(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findOne({
      where: {
        email,
        password: hashWithAppKey(password),
      },
    })

    if (!user) {
      throw new HttpException('INVALID_CREDENTIALS', 401)
    }

    const payload: TokenData = {
      id: user.id,
      createdAt: user.createdAt.toISOString(),
      email: user.email,
      profile: user.profile,
      role: user.role,
    }

    return await this.jwtService.signAsync(payload)
  }
}
