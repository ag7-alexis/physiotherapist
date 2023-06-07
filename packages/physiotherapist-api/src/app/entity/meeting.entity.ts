import {
  MedicalPrescription,
  MedicalProcedure,
  Meeting,
  Patient,
  Practitioner,
} from '@physiotherapist/shared';
import {
  CreationDate,
  Deleted,
  Id,
  UpdateDate,
  Uuid,
} from '@physiotherapist/shared-nodejs';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { PractitionerEntity } from './practitioner.entity';
import { PatientEntity } from './patient.entity';
import { MedicalPrescriptionEntity } from './medical-prescription.entity';
import { MedicalProcedureEntity } from './medical-procedure.entity';

@Entity({ name: 'meeting_m' })
export class MeetingEntity extends BaseEntity implements Meeting {
  private static readonly prefix = 'm';
  @Id(MeetingEntity.prefix)
  id: number;

  @Uuid(MeetingEntity.prefix)
  uuid: string;

  @Column({ name: 'm_status', type: 'varchar' })
  status: 'waiting' | 'ongoing' | 'finished' | 'cancel';

  @Column({ name: 'm_is_date_fixed' })
  isDateFixed: boolean;

  @Column({ name: 'm_charged_price' })
  chargedPrice: number;

  @Column({ name: 'm_expected_start_date' })
  expectedStartDate: Date;

  @Column({ name: 'm_start_date' })
  startDate: Date;

  @Column({ name: 'm_expected_end_date' })
  expectedEndDate: Date;

  @Column({ name: 'm_end_date' })
  endDate: Date;

  @Column({ name: 'm_commentary' })
  commentary: string;

  @Column({ name: 'm_patient_uuid', type: 'uuid' })
  patientUuid: string;

  @ManyToOne(() => PatientEntity, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'm_patient_uuid', referencedColumnName: 'uuid' })
  patient: Patient;

  @Column({ name: 'm_practitioner_uuid', type: 'uuid' })
  practitionerUuid: string;

  @ManyToOne(() => PractitionerEntity, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'm_practitioner_uuid', referencedColumnName: 'uuid' })
  practitioner: Practitioner;

  @Column({ name: 'm_medical_prescription_uuid', type: 'uuid' })
  medicalPrescriptionUuid: string;

  @ManyToOne(() => MedicalPrescriptionEntity, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'm_medical_prescription_uuid',
    referencedColumnName: 'uuid',
  })
  medicalPrescription: MedicalPrescription;

  @Column({ name: 'm_medical_procedure_uuid', type: 'uuid' })
  medicalProcedureUuid: string;

  @ManyToOne(() => MedicalProcedureEntity, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'm_medical_procedure_uuid',
    referencedColumnName: 'uuid',
  })
  medicalProcedure: MedicalProcedure;

  @CreationDate(MeetingEntity.prefix)
  creationDate: Date;

  @UpdateDate(MeetingEntity.prefix)
  updateDate: Date;

  @Deleted(MeetingEntity.prefix)
  deleted: Date | undefined | null;
}
