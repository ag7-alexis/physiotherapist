import { MedicalPrescription, Meeting, Patient } from '@physiotherapist/shared';
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
} from 'typeorm';
import { PatientEntity } from './patient.entity';
import { MeetingEntity } from './meeting.entity';

@Entity({ name: 'medicalprescription_mpn' })
export class MedicalPrescriptionEntity
  extends BaseEntity
  implements MedicalPrescription
{
  private static readonly prefix = 'mpn';
  @Id(MedicalPrescriptionEntity.prefix)
  id: number;

  @Uuid(MedicalPrescriptionEntity.prefix)
  uuid: string;

  @Column({ name: 'mpn_prescribing_doctore' })
  prescribingDoctor: string;

  @Column({ name: 'mpn_prescribing_date' })
  prescriptionDate: Date;

  @Column({ name: 'mpn_total_expected_meetings' })
  totalExpectedMeetings: number;

  @Column({ name: 'mpn_pathology' })
  pathology: string;

  @Column({ name: 'mpn_commentary' })
  commentary: string | undefined;

  @Column({ name: 'mpn_patient_uuid', type: 'uuid' })
  patientUuid: string;

  @ManyToOne(() => PatientEntity, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'mpn_patient_uuid', referencedColumnName: 'uuid' })
  patient: Patient;

  @OneToMany(() => MeetingEntity, (m) => m.medicalPrescription, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  meetings: Meeting[];

  @CreationDate(MedicalPrescriptionEntity.prefix)
  creationDate: Date;

  @UpdateDate(MedicalPrescriptionEntity.prefix)
  updateDate: Date;

  @Deleted(MedicalPrescriptionEntity.prefix)
  deleted: Date | undefined | null;
}
