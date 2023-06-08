import {
  Body,
  Controller,
  Get,
  Post,
  Response,
  UseGuards,
} from '@nestjs/common';
import { User } from '@physiotherapist/shared';
import { AuthService } from './auth.service';
import {
  LocalAuthGuard,
  CurrentUser,
  JwtAuthGuard,
} from '@physiotherapist/shared-nodejs';
import { ApiBody, ApiOkResponse, ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../entity';

export class AuthDto {
  @ApiProperty()
  emailAddress: string;

  @ApiProperty()
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: AuthDto })
  @ApiOkResponse({ status: 200, type: UserEntity })
  @Post('register')
  async register(
    @Body() userData: Partial<User>,
    @Response({ passthrough: true }) res
  ) {
    const { user } = await this.authService.register(userData, res);

    return user;
  }

  @ApiBody({ type: AuthDto })
  @ApiOkResponse({ status: 200, type: UserEntity })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() userCandidate: User,
    @Response({ passthrough: true }) res
  ) {
    const { user } = await this.authService.login(res, userCandidate);

    return user;
  }

  @ApiOkResponse({ status: 200, type: UserEntity })
  @UseGuards(JwtAuthGuard)
  @Get('check')
  async check(
    @CurrentUser() userCandidate: User,
    @Response({ passthrough: true }) res
  ) {
    const { user } = await this.authService.login(res, userCandidate);

    return user;
  }

  @ApiOkResponse({ status: 200, type: 'boolean' })
  @UseGuards(JwtAuthGuard)
  @Get('logout')
  logout(@Response({ passthrough: true }) res) {
    res.clearCookie('accessToken', {
      sameSite: 'strict',
      httpOnly: true,
    });
    return true;
  }
}
