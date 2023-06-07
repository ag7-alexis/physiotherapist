import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingEntity } from '../entity';
import { MeetingController } from './meeting.controller';
import { MeetingService } from './meeting.service';

@Module({
  imports: [TypeOrmModule.forFeature([MeetingEntity])],
  providers: [MeetingService],
  controllers: [MeetingController],
})
export class MeetingModule {}
