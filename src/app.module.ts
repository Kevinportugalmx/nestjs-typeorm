import { RedisModule } from '@nestjs-modules/ioredis'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { config } from './config'
import { UserModule } from './user/user.module'

const { host, port, username, password, database } = config.typeOrmConfig
@Module({
  imports: [
    RedisModule.forRoot({
      config: {
        url: config.redisUrl,
      },
    }),
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host,
      port,
      username,
      password,
      database,
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrationsTableName: 'migration',
      migrations: ['dist/database/migrations/*.ts'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
