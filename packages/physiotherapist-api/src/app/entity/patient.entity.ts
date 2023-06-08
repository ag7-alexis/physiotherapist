import { MedicalPrescription, Patient } from '@physiotherapist/shared';
import {
  CreationDate,
  Deleted,
  Id,
  UpdateDate,
  Uuid,
} from '@physiotherapist/shared-nodejs';
import { BaseEntity, Column, Entity, OneToMany } from 'typeorm';
import { MedicalPrescriptionEntity } from './medical-prescription.entity';
import { ApiProperty } from '@nestjsx/crud/lib/crud';

@Entity({ name: 'patient_pt' })
export class PatientEntity extends BaseEntity implements Patient {
  private static readonly prefix = 'pt';

  @ApiProperty()
  @Id(PatientEntity.prefix)
  id: number;

  @ApiProperty()
  @Uuid(PatientEntity.prefix)
  uuid: string;

  @ApiProperty()
  @Column({ name: 'pt_social_security_number', unique: true })
  socialsecurityNumber: string;

  @ApiProperty()
  @Column({ name: 'pt_email_address', unique: true })
  emailAddress: string;

  @ApiProperty()
  @Column({ name: 'pt_firstname' })
  firstname: string;

  @ApiProperty()
  @Column({ name: 'pt_lastname' })
  lastname: string;

  @ApiProperty()
  @Column({ name: 'pt_phone_number' })
  phoneNumber: string;

  @ApiProperty()
  @Column({ name: 'pt_street_line_address' })
  streetlineAddress: string;

  @ApiProperty()
  @Column({ name: 'pt_city_address' })
  cityAddress: string;

  @ApiProperty()
  @Column({ name: 'pt_zipcode_address' })
  zipcodeAddress: string;

  @ApiProperty()
  @Column({ name: 'pt_latitude_address', type: 'float' })
  latAddress: number;

  @ApiProperty()
  @Column({ name: 'pt_longitude_address', type: 'float' })
  lonAddress: number;

  @ApiProperty()
  @OneToMany(() => MedicalPrescriptionEntity, (mp) => mp.patient, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  medicalPrescriptions: MedicalPrescription[];

  @ApiProperty()
  @CreationDate(PatientEntity.prefix)
  creationDate: Date;

  @ApiProperty()
  @UpdateDate(PatientEntity.prefix)
  updateDate: Date;

  @ApiProperty()
  @Deleted(PatientEntity.prefix)
  deleted: Date | undefined | null;
}
