import {
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import {
  Crud,
  CrudController,
  CrudRequest,
  CrudRequestInterceptor,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { PractitionerEntity } from '../entity';
import { PractitionerService } from './practitioner.service';
import { CurrentUser, JwtAuthGuard } from '@physiotherapist/shared-nodejs';
import { User } from '@physiotherapist/shared';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';

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
// @UseGuards(JwtAuthGuard)
export class PractitionerController
  implements CrudController<PractitionerEntity>
{
  constructor(public service: PractitionerService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(CrudRequestInterceptor)
  @ApiOkResponse({ status: 200, type: PractitionerEntity })
  me(@ParsedRequest() req: CrudRequest, @CurrentUser() user: User) {
    req.parsed.search = { $and: [{ userUuid: user.uuid }] };
    return this.service.getOne(req);
  }

  @Post('me')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(CrudRequestInterceptor)
  @ApiBody({ type: PractitionerEntity })
  @ApiOkResponse({ status: 200, type: PractitionerEntity })
  createMe(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: PractitionerEntity,
    @CurrentUser() user: User
  ) {
    dto.userUuid = user.uuid;
    dto.user = user;
    return this.service.createOne(req, dto);
  }
}
