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
import { ApiProperty } from '@nestjsx/crud/lib/crud';

@Entity({ name: 'user_u' })
export class UserEntity extends BaseEntity implements User {
  private static readonly prefix = 'u';

  @ApiProperty()
  @Id(UserEntity.prefix)
  id: number;

  @ApiProperty()
  @Uuid(UserEntity.prefix)
  uuid: string;

  @ApiProperty()
  @Column({ name: 'u_email_address', unique: true })
  emailAddress: string;

  @ApiProperty()
  @Exclude()
  @Column({ name: 'u_password' })
  password: string;

  @ApiProperty()
  @CreationDate(UserEntity.prefix)
  creationDate: Date;

  @ApiProperty()
  @UpdateDate(UserEntity.prefix)
  updateDate: Date;

  @ApiProperty()
  @Deleted(UserEntity.prefix)
  deleted: Date | undefined | null;
}
