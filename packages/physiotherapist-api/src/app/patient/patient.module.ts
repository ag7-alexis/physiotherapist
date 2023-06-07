import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientEntity } from '../entity';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';

@Module({
  imports: [TypeOrmModule.forFeature([PatientEntity])],
  providers: [PatientService],
  controllers: [PatientController],
})
export class PatientModule {}
