import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { PatientEntity } from '../entity';

@Injectable()
export class PatientService extends TypeOrmCrudService<PatientEntity> {
  constructor(@InjectRepository(PatientEntity) repo) {
    super(repo);
  }
}
