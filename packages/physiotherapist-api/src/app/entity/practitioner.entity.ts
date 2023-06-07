import { MedicalProcedure, Practitioner, User } from '@physiotherapist/shared';
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
  OneToMany,
  OneToOne,
} from 'typeorm';
import { MedicalProcedureEntity } from './medical-procedure.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'practitioner_pr' })
export class PractitionerEntity extends BaseEntity implements Practitioner {
  private static readonly prefix = 'pr';
  @Id(PractitionerEntity.prefix)
  id: number;

  @Uuid(PractitionerEntity.prefix)
  uuid: string;

  @Column({ name: 'pr_social_security_number', unique: true })
  socialsecurityNumber: string;

  @Column({ name: 'pr_email_address', unique: true })
  emailAddress: string;

  @Column({ name: 'pr_firstname' })
  firstname: string;

  @Column({ name: 'pr_lastname' })
  lastname: string;

  @Column({ name: 'pr_phone_number' })
  phoneNumber: string;

  @Column({ name: 'pr_street_line_address' })
  streetlineAddress: string;

  @Column({ name: 'pr_city_address' })
  cityAddress: string;

  @Column({ name: 'pr_zipcode_address' })
  zipcodeAddress: string;

  @Column({ name: 'pr_latitude_address' })
  latAddress: number;

  @Column({ name: 'pr_longitude_address' })
  lonAddress: number;

  @Column({ name: 'pr_speciality' })
  speciality: string;

  @OneToMany(() => MedicalProcedureEntity, (mp) => mp.practitioner, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  medialProdecudes: MedicalProcedure[];

  @Column({ name: 'pr_user_uuid', type: 'uuid' })
  userUuid: string;

  @OneToOne(() => UserEntity, {
    nullable: true,
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'pr_user_uuid', referencedColumnName: 'uuid' })
  user: User;

  @CreationDate(PractitionerEntity.prefix)
  creationDate: Date;

  @UpdateDate(PractitionerEntity.prefix)
  updateDate: Date;

  @Deleted(PractitionerEntity.prefix)
  deleted: Date | undefined | null;
}
