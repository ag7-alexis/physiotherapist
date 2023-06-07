import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { PractitionerEntity } from '../entity';

@Injectable()
export class PractitionerService extends TypeOrmCrudService<PractitionerEntity> {
  constructor(@InjectRepository(PractitionerEntity) repo) {
    super(repo);
  }
}
