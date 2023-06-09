import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { File } from '@physiotherapist/shared';
import {
  Id,
  Uuid,
  CreationDate,
  UpdateDate,
  Deleted,
} from '@physiotherapist/shared-nodejs';
import { BaseEntity, Column, Entity } from 'typeorm';

@Entity({ name: 'file_f' })
export class FileEntity extends BaseEntity implements File {
  private static readonly prefix = 'f';

  @ApiProperty()
  @Id(FileEntity.prefix)
  id: number;

  @ApiProperty()
  @Uuid(FileEntity.prefix)
  uuid: string;

  @ApiProperty()
  @Column({ name: 'f_path' })
  path: string;

  @ApiProperty()
  @Column({ name: 'f_url' })
  url: string;

  @ApiProperty()
  @Column({ name: 'f_category' })
  category: string;

  @ApiProperty()
  @Column({ name: 'f_relation_uuid' })
  relationUuid?: string;

  @ApiProperty()
  @CreationDate(FileEntity.prefix)
  creationDate: Date;

  @ApiProperty()
  @UpdateDate(FileEntity.prefix)
  updateDate: Date;

  @ApiProperty()
  @Deleted(FileEntity.prefix)
  deleted: Date | undefined | null;
}
