import 'dotenv/config'

class Config {
  get appKey() {
    return this.getEnv('APP_KEY')
  }

  get typeOrmConfig() {
    return {
      type: this.getEnv('DATABASE_TYPE') as 'postgres' | 'mysql',
      host: this.getEnv('DATABASE_HOST'),
      port: Number(this.getEnv('DATABASE_PORT')),
      username: this.getEnv('DATABASE_USERNAME'),
      password: this.getEnv('DATABASE_PASSWORD'),
      database: this.getEnv('DATABASE_NAME'),
      entities: ['**/*.entity{.ts,.js}'],
      migrationsTableName: 'migration',
      migrations: ['src/migration/*.ts'],
      cli: {
        migrationsDir: 'src/migration',
      },
    }
  }

  get redisUrl() {
    return this.getEnv('REDIS_URL')
  }

  get port() {
    return this.getEnv('PORT')
  }

  get JwtSecret(): string {
    return this.getEnv('JWT_SECRET')
  }

  get JwtExpiresIn(): string {
    return this.getEnv('JWT_EXPIRES_IN')
  }

  getEnv(key: string) {
    if (!process.env[key]) {
      throw new Error(`Environment variable ${key} is not set`)
    }
    return process.env[key]
  }
}

export const config = new Config()
