import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { MeetingEntity } from '../entity';
import { fromUnknownToDate } from '@physiotherapist/shared';
import { Between } from 'typeorm';
import { endOfDay, startOfDay } from 'date-fns';

@Injectable()
export class MeetingService extends TypeOrmCrudService<MeetingEntity> {
  constructor(@InjectRepository(MeetingEntity) repo) {
    super(repo);
  }

  getMyTodaysMeetings(userUuid: string) {
    const today = fromUnknownToDate('today');

    return this.repo.find({
      where: {
        practitioner: {
          userUuid: userUuid,
        },
        expectedStartDate: Between(startOfDay(today), endOfDay(today)),
      },
      relations: [
        'patient',
        'practitioner',
        'medicalPrescription',
        'medicalProcedure',
      ],
      order: {
        expectedStartDate: 'ASC',
      },
    });
  }
}
