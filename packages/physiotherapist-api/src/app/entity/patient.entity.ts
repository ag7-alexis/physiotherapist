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

@Entity({ name: 'patient_pt' })
export class PatientEntity extends BaseEntity implements Patient {
  private static readonly prefix = 'pt';
  @Id(PatientEntity.prefix)
  id: number;

  @Uuid(PatientEntity.prefix)
  uuid: string;

  @Column({ name: 'pt_social_security_number', unique: true })
  socialsecurityNumber: string;

  @Column({ name: 'pt_email_address', unique: true })
  emailAddress: string;

  @Column({ name: 'pt_firstname' })
  firstname: string;

  @Column({ name: 'pt_lastname' })
  lastname: string;

  @Column({ name: 'pt_phone_number' })
  phoneNumber: string;

  @Column({ name: 'pt_street_line_address' })
  streetlineAddress: string;

  @Column({ name: 'pt_city_address' })
  cityAddress: string;

  @Column({ name: 'pt_zipcode_address' })
  zipcodeAddress: string;

  @Column({ name: 'pt_latitude_address' })
  latAddress: number;

  @Column({ name: 'pt_longitude_address' })
  lonAddress: number;

  @OneToMany(() => MedicalPrescriptionEntity, (mp) => mp.patient, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  medicalPrescriptions: MedicalPrescription[];

  @CreationDate(PatientEntity.prefix)
  creationDate: Date;

  @UpdateDate(PatientEntity.prefix)
  updateDate: Date;

  @Deleted(PatientEntity.prefix)
  deleted: Date | undefined | null;
}
