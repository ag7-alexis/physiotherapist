import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ENTITIES } from './entites';
import { PractitionerModule } from './practitioner/practitioner.module';
import { PatientModule } from './patient/patient.module';
import { MeetingModule } from './meeting/meeting.module';
import { LoggerMiddleware } from '@physiotherapist/shared-nodejs';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${__dirname}/../../.env`,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        logging: ['error'],
        // logging: true,
        entities: [...ENTITIES],
      }),
    }),
    PassportModule,
    AuthModule,
    PractitionerModule,
    PatientModule,
    MeetingModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
