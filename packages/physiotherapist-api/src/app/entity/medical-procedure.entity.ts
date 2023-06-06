import { MedicalProcedure, Practitioner } from '@physiotherapist/shared';
import {
  CreationDate,
  Deleted,
  Id,
  UpdateDate,
  Uuid,
} from '@physiotherapist/shared-nodejs';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { PractitionerEntity } from './practitioner.entity';

@Entity({ name: 'medicalprocedure_mpe' })
export class MedicalProcedureEntity
  extends BaseEntity
  implements MedicalProcedure
{
  private static readonly prefix = 'mpe';
  @Id(MedicalProcedureEntity.prefix)
  id: number;

  @Uuid(MedicalProcedureEntity.prefix)
  uuid: string;

  @Column({ name: 'mpe_title' })
  title: string;

  @Column({ name: 'mpe_designation' })
  designation: string;

  @Column({ name: 'mpe_price' })
  price: number;

  @Column({ name: 'mpe_duration_in_minutes' })
  durationInMinutes: number;

  @Column({ name: 'mpe_practitioner_uuid' })
  practitionerUuid: string;

  @ManyToOne(() => PractitionerEntity, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'mpe_practitioner_uuid', referencedColumnName: 'uuid' })
  practitioner: Practitioner;

  @CreationDate(MedicalProcedureEntity.prefix)
  creationDate: Date;

  @UpdateDate(MedicalProcedureEntity.prefix)
  updateDate: Date;

  @Deleted(MedicalProcedureEntity.prefix)
  deleted: Date | undefined | null;
}
