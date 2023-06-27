import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
  ManyToMany,
  ManyToOne,
} from 'typeorm'
import { Profile } from './profile.entity'

export enum Roles {
  ADMIN = 'admin',
  USER = 'user',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column()
  role: Roles

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus

  @CreateDateColumn()
  createdAt: Date

  @OneToOne(() => Profile) // PK TO PK
  @JoinColumn()
  profile: Profile

  //@OneToMany() //PK TO FK
  //@ManyToMany() //FK TO FK
  //@ManyToOne() // FK TO PK
}
