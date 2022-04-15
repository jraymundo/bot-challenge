import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 54320,
  username: 'homestead',
  password: 'secret',
  database: 'lista',
  synchronize: false,
  entities: [__dirname + '/../**/**.entity{.ts,.js}'],
  migrations: ['dist/src/db/migrations/*.js'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};

export default dbConfig;
