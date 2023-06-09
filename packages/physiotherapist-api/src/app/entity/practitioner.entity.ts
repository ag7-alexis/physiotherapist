import {
  File,
  MedicalProcedure,
  Practitioner,
  User,
} from '@physiotherapist/shared';
import {
  CreationDate,
  Deleted,
  Id,
  UpdateDate,
  Uuid,
} from '@physiotherapist/shared-nodejs';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { MedicalProcedureEntity } from './medical-procedure.entity';
import { UserEntity } from './user.entity';
import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { FileEntity } from './file.entity';

@Entity({ name: 'practitioner_pr' })
export class PractitionerEntity extends BaseEntity implements Practitioner {
  private static readonly prefix = 'pr';

  @ApiProperty()
  @Id(PractitionerEntity.prefix)
  id: number;

  @ApiProperty()
  @Uuid(PractitionerEntity.prefix)
  uuid: string;

  @ApiProperty()
  @Column({ name: 'pr_email_address', unique: true })
  emailAddress: string;

  @ApiProperty()
  @Column({ name: 'pr_firstname' })
  firstname: string;

  @ApiProperty()
  @Column({ name: 'pr_lastname' })
  lastname: string;

  @ApiProperty()
  @Column({ name: 'pr_phone_number' })
  phoneNumber: string;

  @ApiProperty()
  @Column({ name: 'pr_street_line_address' })
  streetlineAddress: string;

  @ApiProperty()
  @Column({ name: 'pr_city_address' })
  cityAddress: string;

  @ApiProperty()
  @Column({ name: 'pr_zipcode_address' })
  zipcodeAddress: string;

  @ApiProperty()
  @Column({ name: 'pr_latitude_address', type: 'float' })
  latAddress: number;

  @ApiProperty()
  @Column({ name: 'pr_longitude_address', type: 'float' })
  lonAddress: number;

  @ApiProperty()
  @Column({ name: 'pr_speciality' })
  speciality: string;

  @ApiProperty()
  @OneToMany(() => MedicalProcedureEntity, (mp) => mp.practitioner, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  medialProdecudes: MedicalProcedure[];

  @ApiProperty()
  @Column({ name: 'pr_user_uuid', type: 'uuid' })
  userUuid: string;

  @ApiProperty()
  @OneToOne(() => UserEntity, {
    nullable: true,
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'pr_user_uuid', referencedColumnName: 'uuid' })
  user: User;

  @ApiProperty()
  @Column({ name: 'pr_picture_file_uuid', type: 'uuid' })
  pictureFileUuid: string | undefined;

  @ApiProperty()
  @ManyToOne(() => FileEntity, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'pr_picture_file_uuid',
    referencedColumnName: 'uuid',
  })
  pictureFile: File | undefined;

  @ApiProperty()
  @CreationDate(PractitionerEntity.prefix)
  creationDate: Date;

  @ApiProperty()
  @UpdateDate(PractitionerEntity.prefix)
  updateDate: Date;

  @ApiProperty()
  @Deleted(PractitionerEntity.prefix)
  deleted: Date | undefined | null;
}
