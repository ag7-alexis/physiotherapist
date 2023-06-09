import { Controller, UseGuards } from '@nestjs/common';

import { Crud, CrudController } from '@nestjsx/crud';
import { PatientEntity } from '../entity';
import { PatientService } from './patient.service';
import { JwtAuthGuard } from '@physiotherapist/shared-nodejs';
import { ApiOkResponse } from '@nestjs/swagger';

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
@UseGuards(JwtAuthGuard)
export class PatientController implements CrudController<PatientEntity> {
  constructor(public service: PatientService) {}
}
