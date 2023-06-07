import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User, absent, fromUnknownToDate } from '@physiotherapist/shared';
import { BaseAuthService } from '@physiotherapist/shared-nodejs';
interface Credentials {
  user: Partial<
    User & {
      exp: number;
      iat: number;
    }
  >;
  accessToken: string;
}
@Injectable()
export class AuthService extends BaseAuthService {
  constructor(
    @InjectRepository(UserEntity)
    protected userRepository: Repository<UserEntity>,
    protected jwtService: JwtService
  ) {
    super();
  }

  async register(userData: Partial<User>, res: any) {
    const passwordEncrypted = await bcrypt.hash(userData.password, 10);
    const user = this.userRepository.create({
      emailAddress: userData.emailAddress,
      password: passwordEncrypted,
    });
    await user.save();

    return this.handleJWT(res, user);
  }

  async validateUser(userCandidate: Partial<User>): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { emailAddress: userCandidate.emailAddress },
    });
    if (absent(user)) {
      throw new NotFoundException();
    }
    if (await bcrypt.compare(userCandidate.password, user.password)) {
      return user;
    }
    throw new UnauthorizedException();
  }

  login(res: any, user: User): Credentials {
    return this.handleJWT(res, user);
  }

  private handleJWT(
    res: any,
    user: Partial<User & { exp: number; iat: number }>
  ): Credentials {
    const { exp, iat, ...userToken } = user;
    const credentials = {
      user,
      accessToken: this.jwtService.sign({ ...userToken }),
    };
    this.setCookieJWT(res, credentials.accessToken);
    return credentials;
  }

  private setCookieJWT(res: any, accessToken: string) {
    const current_date = fromUnknownToDate('tomorrow');
    res.cookie('accessToken', accessToken, {
      expires: current_date,
      httpOnly: true,
    });
  }
}
