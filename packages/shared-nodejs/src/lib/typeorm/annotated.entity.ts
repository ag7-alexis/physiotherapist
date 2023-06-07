import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export function CreationDate(prefix: string) {
  return CreateDateColumn({ name: prefix + '_creation_date' });
}

export function UpdateDate(prefix: string) {
  return UpdateDateColumn({ name: prefix + '_update_date' });
}

export function Id(prefix: string) {
  return PrimaryGeneratedColumn({ name: prefix + '_id' });
}

export function Uuid(prefix: string) {
  return Column({
    name: prefix + '_uuid',
    generated: 'uuid',
    unique: true,
    type: 'uuid',
  });
}

export function Deleted(prefix: string) {
  return DeleteDateColumn({ name: prefix + '_deleted' });
}
