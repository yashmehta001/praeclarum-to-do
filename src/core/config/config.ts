import * as process from 'process';

export const configParser = () => {
  return {
    port: process.env.APP_PORT || 3000,
    database: {
      type: process.env.DATABASE_TYPE || 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'docker',
      password: process.env.DB_PASSWORD || 'docker',
      database: process.env.DB_NAME || 'todo',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: process.env.DATABASE_SYNCHRONIZE || true,
    },
  };
};
