import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PractitionerEntity } from '../entity';
import { PractitionerService } from './practitioner.service';
import { PractitionerController } from './practitioner.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PractitionerEntity])],
  providers: [PractitionerService],
  controllers: [PractitionerController],
})
export class PractitionerModule {}
