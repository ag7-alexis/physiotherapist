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
import { ApiProperty } from '@nestjsx/crud/lib/crud';

@Entity({ name: 'meeting_m' })
export class MeetingEntity extends BaseEntity implements Meeting {
  private static readonly prefix = 'm';

  @ApiProperty()
  @Id(MeetingEntity.prefix)
  id: number;

  @ApiProperty()
  @Uuid(MeetingEntity.prefix)
  uuid: string;

  @ApiProperty()
  @Column({ name: 'm_status', type: 'varchar' })
  status: 'waiting' | 'ongoing' | 'finished' | 'cancel';

  @ApiProperty()
  @Column({ name: 'm_is_date_fixed' })
  isDateFixed: boolean;

  @ApiProperty()
  @Column({ name: 'm_charged_price' })
  chargedPrice: number;

  @ApiProperty()
  @Column({ name: 'm_expected_start_date' })
  expectedStartDate: Date;

  @ApiProperty()
  @Column({ name: 'm_start_date' })
  startDate: Date;

  @ApiProperty()
  @Column({ name: 'm_expected_end_date' })
  expectedEndDate: Date;

  @ApiProperty()
  @Column({ name: 'm_end_date' })
  endDate: Date;

  @ApiProperty()
  @Column({ name: 'm_commentary' })
  commentary: string;

  @ApiProperty()
  @Column({ name: 'm_patient_uuid', type: 'uuid' })
  patientUuid: string;

  @ApiProperty()
  @ManyToOne(() => PatientEntity, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'm_patient_uuid', referencedColumnName: 'uuid' })
  patient: Patient;

  @ApiProperty()
  @Column({ name: 'm_practitioner_uuid', type: 'uuid' })
  practitionerUuid: string;

  @ApiProperty()
  @ManyToOne(() => PractitionerEntity, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'm_practitioner_uuid', referencedColumnName: 'uuid' })
  practitioner: Practitioner;

  @ApiProperty()
  @Column({ name: 'm_medical_prescription_uuid', type: 'uuid' })
  medicalPrescriptionUuid: string;

  @ApiProperty()
  @ManyToOne(() => MedicalPrescriptionEntity, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'm_medical_prescription_uuid',
    referencedColumnName: 'uuid',
  })
  medicalPrescription: MedicalPrescription;

  @ApiProperty()
  @Column({ name: 'm_medical_procedure_uuid', type: 'uuid' })
  medicalProcedureUuid: string;

  @ApiProperty()
  @ManyToOne(() => MedicalProcedureEntity, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'm_medical_procedure_uuid',
    referencedColumnName: 'uuid',
  })
  medicalProcedure: MedicalProcedure;

  @ApiProperty()
  @CreationDate(MeetingEntity.prefix)
  creationDate: Date;

  @ApiProperty()
  @UpdateDate(MeetingEntity.prefix)
  updateDate: Date;

  @ApiProperty()
  @Deleted(MeetingEntity.prefix)
  deleted: Date | undefined | null;
}
