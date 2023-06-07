import { DataSource } from 'typeorm';
import { ENTITIES } from './entites';

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [...ENTITIES],
  migrations: ['migrations/*'],
});
