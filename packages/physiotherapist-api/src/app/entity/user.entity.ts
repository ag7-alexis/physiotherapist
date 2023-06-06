import type { User } from '@physiotherapist/shared';
import { BaseEntity, Column, Entity } from 'typeorm';
import {
  CreationDate,
  Deleted,
  Id,
  UpdateDate,
  Uuid,
} from '@physiotherapist/shared-nodejs';
import { Exclude } from 'class-transformer';

@Entity({ name: 'user_u' })
export class UserEntity extends BaseEntity implements User {
  private static readonly prefix = 'u';
  @Id(UserEntity.prefix)
  id: number;

  @Uuid(UserEntity.prefix)
  uuid: string;

  @Column({ name: 'u_email_address', unique: true })
  emailAddress: string;

  @Exclude()
  @Column({ name: 'u_password' })
  password: string;

  @CreationDate(UserEntity.prefix)
  creationDate: Date;

  @UpdateDate(UserEntity.prefix)
  updateDate: Date;

  @Deleted(UserEntity.prefix)
  deleted: Date | undefined | null;
}
