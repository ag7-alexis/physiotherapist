import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { LocalStrategy } from '@physiotherapist/shared-nodejs';
import { UserEntity } from '../entity';
import { AuthService } from './auth.service';

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: config.get('JWT_EXPIRATION') },
      }),
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [
    AuthService,
    {
      provide: LocalStrategy,
      useFactory(authService: AuthService) {
        return new LocalStrategy(authService);
      },
      inject: [AuthService],
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
