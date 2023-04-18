import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  firstName?: string

  @Column({ nullable: true })
  lastName?: string

  @Column({ nullable: true })
  phone?: string

  @Column({ nullable: true })
  fiscalCode?: string

  @Column({ nullable: true })
  phoneNumber?: string

  @Column({ nullable: true })
  email?: string

  @Column({ nullable: true })
  address?: string

  @Column({ nullable: true })
  shippingAddress?: string
}
