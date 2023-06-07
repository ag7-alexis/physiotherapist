import { Controller } from '@nestjs/common';

import { Crud, CrudController } from '@nestjsx/crud';
import { MeetingEntity } from '../entity';
import { MeetingService } from './meeting.service';

@Crud({
  model: {
    type: MeetingEntity,
  },
  params: {
    uuid: {
      field: 'uuid',
      type: 'uuid',
      primary: true,
    },
  },
  query: {
    join: {
      patient: {
        eager: true,
      },
      practitioner: {
        eager: true,
      },
      medicalPrescription: {
        eager: true,
      },
      medicalProcedure: {
        eager: true,
      },
    },
    softDelete: true,
    sort: [{ field: 'creationDate', order: 'DESC' }],
  },
})
@Controller('meeting')
export class MeetingController implements CrudController<MeetingEntity> {
  constructor(public service: MeetingService) {}
}
