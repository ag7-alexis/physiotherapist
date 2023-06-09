import {
  File,
  MedicalPrescription,
  Meeting,
  Patient,
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
} from 'typeorm';
import { PatientEntity } from './patient.entity';
import { MeetingEntity } from './meeting.entity';
import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { FileEntity } from './file.entity';

@Entity({ name: 'medicalprescription_mpn' })
export class MedicalPrescriptionEntity
  extends BaseEntity
  implements MedicalPrescription
{
  private static readonly prefix = 'mpn';

  @ApiProperty()
  @Id(MedicalPrescriptionEntity.prefix)
  id: number;

  @ApiProperty()
  @Uuid(MedicalPrescriptionEntity.prefix)
  uuid: string;

  @ApiProperty()
  @Column({ name: 'mpn_prescribing_doctore' })
  prescribingDoctor: string;

  @ApiProperty()
  @Column({ name: 'mpn_prescribing_date' })
  prescriptionDate: Date;

  @ApiProperty()
  @Column({ name: 'mpn_total_expected_meetings' })
  totalExpectedMeetings: number;

  @ApiProperty()
  @Column({ name: 'mpn_pathology' })
  pathology: string;

  @ApiProperty()
  @Column({ name: 'mpn_commentary' })
  commentary: string | undefined;

  @ApiProperty()
  @Column({ name: 'mpn_patient_uuid', type: 'uuid' })
  patientUuid: string;

  @ApiProperty()
  @ManyToOne(() => PatientEntity, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'mpn_patient_uuid', referencedColumnName: 'uuid' })
  patient: Patient;

  @ApiProperty()
  @OneToMany(() => MeetingEntity, (m) => m.medicalPrescription, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  meetings: Meeting[];

  @ApiProperty()
  @Column({ name: 'mpn_prescription_picture_file_uuid', type: 'uuid' })
  prescriptionPictureFileUuid: string | undefined;

  @ApiProperty()
  @ManyToOne(() => FileEntity, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'mpn_prescription_picture_file_uuid',
    referencedColumnName: 'uuid',
  })
  prescriptionPictureFile: File | undefined;

  @ApiProperty()
  @CreationDate(MedicalPrescriptionEntity.prefix)
  creationDate: Date;

  @ApiProperty()
  @UpdateDate(MedicalPrescriptionEntity.prefix)
  updateDate: Date;

  @ApiProperty()
  @Deleted(MedicalPrescriptionEntity.prefix)
  deleted: Date | undefined | null;
}
