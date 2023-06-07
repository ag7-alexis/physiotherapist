import { Strategy } from 'passport-local';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BaseAuthService } from './base-auth.service';
import { User } from '@physiotherapist/shared';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: BaseAuthService) {
    super({ usernameField: 'emailAddress' });
  }

  async validate(emailAddress: string, password: string): Promise<User> {
    const user = await this.authService.validateUser({
      emailAddress,
      password,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
