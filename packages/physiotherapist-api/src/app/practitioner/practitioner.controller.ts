import { Controller } from '@nestjs/common';

import { Crud, CrudController } from '@nestjsx/crud';
import { PractitionerEntity } from '../entity';
import { PractitionerService } from './practitioner.service';

@Crud({
  model: {
    type: PractitionerEntity,
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
      medialProdecudes: {
        eager: true,
      },
      user: {
        eager: true,
      },
    },
    softDelete: true,
    sort: [{ field: 'creationDate', order: 'DESC' }],
  },
})
@Controller('practitioner')
export class PractitionerController
  implements CrudController<PractitionerEntity>
{
  constructor(public service: PractitionerService) {}
}
