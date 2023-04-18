import { DataSource } from 'typeorm'
import { config } from './src/config'
const { host, port, username, password, database, type } = config.typeOrmConfig

export const connectionSource = new DataSource({
  migrationsTableName: 'migrations',
  type,
  host,
  port,
  username,
  password,
  database,
  logging: false,
  synchronize: false,
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['src/database/migrations/**/*{.ts,.js}'],
  subscribers: ['src/database/subscriber/**/*{.ts,.js}'],
})
