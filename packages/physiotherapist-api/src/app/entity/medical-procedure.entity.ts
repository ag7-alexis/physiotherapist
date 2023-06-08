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
import { ApiProperty } from '@nestjsx/crud/lib/crud';

@Entity({ name: 'medicalprocedure_mpe' })
export class MedicalProcedureEntity
  extends BaseEntity
  implements MedicalProcedure
{
  private static readonly prefix = 'mpe';

  @ApiProperty()
  @Id(MedicalProcedureEntity.prefix)
  id: number;

  @ApiProperty()
  @Uuid(MedicalProcedureEntity.prefix)
  uuid: string;

  @ApiProperty()
  @Column({ name: 'mpe_title' })
  title: string;

  @ApiProperty()
  @Column({ name: 'mpe_designation' })
  designation: string;

  @ApiProperty()
  @Column({ name: 'mpe_price' })
  price: number;

  @ApiProperty()
  @Column({ name: 'mpe_duration_in_minutes' })
  durationInMinutes: number;

  @ApiProperty()
  @Column({ name: 'mpe_practitioner_uuid', type: 'uuid' })
  practitionerUuid: string;

  @ApiProperty()
  @ManyToOne(() => PractitionerEntity, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'mpe_practitioner_uuid', referencedColumnName: 'uuid' })
  practitioner: Practitioner;

  @ApiProperty()
  @CreationDate(MedicalProcedureEntity.prefix)
  creationDate: Date;

  @ApiProperty()
  @UpdateDate(MedicalProcedureEntity.prefix)
  updateDate: Date;

  @ApiProperty()
  @Deleted(MedicalProcedureEntity.prefix)
  deleted: Date | undefined | null;
}
