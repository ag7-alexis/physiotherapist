import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { MeetingEntity } from '../entity';

@Injectable()
export class MeetingService extends TypeOrmCrudService<MeetingEntity> {
  constructor(@InjectRepository(MeetingEntity) repo) {
    super(repo);
  }
}