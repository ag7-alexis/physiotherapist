import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';

import { ApiOkResponse } from '@nestjs/swagger';
import {
  Crud,
  CrudController,
  CrudRequest,
  CrudRequestInterceptor,
  ParsedRequest,
} from '@nestjsx/crud';
import { User } from '@physiotherapist/shared';
import { CurrentUser, JwtAuthGuard } from '@physiotherapist/shared-nodejs';
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
@UseGuards(JwtAuthGuard)
export class MeetingController implements CrudController<MeetingEntity> {
  constructor(public service: MeetingService) {}

  @Get('my-todays-meetings')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(CrudRequestInterceptor)
  @ApiOkResponse({ status: 200, type: MeetingEntity, isArray: true })
  me(@ParsedRequest() req: CrudRequest, @CurrentUser() user: User) {
    return this.service.getMyTodaysMeetings(user.uuid);
  }
}
