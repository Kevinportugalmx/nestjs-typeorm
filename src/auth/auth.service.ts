import { HttpException, Injectable } from '@nestjs/common'
import { config } from '../config'
import { JwtService } from '@nestjs/jwt'
import { TokenData } from '../types'
import { hashWithAppKey } from '../utils'
import { DataSource, Repository } from 'typeorm'
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
    private dataSource: DataSource,
    private jwtService: JwtService
  ) {}

  async register(
    user: Partial<User>,
    profile: Partial<Profile>
  ): Promise<User> {
    const userFound = await this.userRepository.findOneBy({ email: user.email })
    if (userFound) {
      throw new HttpException('USER_ALREADY_EXISTS', 409)
    }
    await this.dataSource.transaction(async (manager) => {
      await manager.save(Profile, profile)
      await manager.save(User, {
        ...user,
        profile,
      })
    })

    return await this.userRepository.findOneBy({ email: user.email })
  }

  async delete(id: number): Promise<boolean> {
    const userFound = await this.userRepository.findOne({
      where: { id },
      relations: ['profile'],
    })
    console.log({ userFound })
    await this.dataSource.transaction(async (manager) => {
      await manager.delete(User, id)
      await manager.delete(Profile, userFound.profile.id)
    })
    return true
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    const userFound = await this.userRepository.findOneBy({ id })
    if (!userFound) {
      throw new HttpException('USER_NOT_FOUND', 404)
    }
    await this.userRepository.update(id, user)
    return await this.userRepository.findOneBy({ id })
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
