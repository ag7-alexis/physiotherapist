import { Controller } from '@nestjs/common';

import { Crud, CrudController } from '@nestjsx/crud';
import { PatientEntity } from '../entity';
import { PatientService } from './patient.service';

@Crud({
  model: {
    type: PatientEntity,
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
      medicalPrescriptions: {
        eager: true,
      },
    },
    softDelete: true,
    sort: [{ field: 'creationDate', order: 'DESC' }],
  },
})
@Controller('patient')
export class PatientController implements CrudController<PatientEntity> {
  constructor(public service: PatientService) {}
}
