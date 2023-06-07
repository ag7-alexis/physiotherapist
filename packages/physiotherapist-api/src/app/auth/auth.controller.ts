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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() userData: Partial<User>,
    @Response({ passthrough: true }) res
  ) {
    const { user } = await this.authService.register(userData, res);

    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() userCandidate: User,
    @Response({ passthrough: true }) res
  ) {
    const { user } = await this.authService.login(res, userCandidate);

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('check')
  async check(
    @CurrentUser() userCandidate: User,
    @Response({ passthrough: true }) res
  ) {
    console.log({ userCandidate });
    const { user } = await this.authService.login(res, userCandidate);

    return user;
  }

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
