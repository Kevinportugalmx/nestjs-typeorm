import { Request } from 'express'
import { Profile } from './database/entities/profile.entity'
import { Roles } from './database/entities/user.entity'

export interface TokenData {
  id: number
  email: string
  profile: Profile
  createdAt: string
  role: Roles
}

export type RequestWithTokenData = Request & {
  user: TokenData
}
