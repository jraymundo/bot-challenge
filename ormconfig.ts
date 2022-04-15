const config: Object = {
  type: 'postgres',
  host: 'localhost',
  port: 54320,
  username: 'homestead',
  password: 'secret',
  database: 'lista',
  synchronize: false,
  entities: ['dist/src/**/*.entity.js'],
  migrations: ['dist/src/db/migrations/*.js'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};

export default config;
