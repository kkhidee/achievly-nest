import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { ApiExcludeEndpoint, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { AuthService } from '@/auth/auth.service';
import { ISocialProfile } from '@/auth/types/auth.type';
import { JwtAuthGuard } from '@/auth/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Get('/check')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 401 })
  @ApiOperation({ summary: 'Проверка авторизации', operationId: 'checkAuth' })
  async checkAuth() {}

  @ApiExcludeEndpoint()
  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @ApiExcludeEndpoint()
  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(
    @Req() req: { user: ISocialProfile },
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.login(req.user);

    await this.authService.attachTokensToResponse(user, response);

    response.redirect(this.configService.get('CLIENT_URL') as string);
  }

  @ApiExcludeEndpoint()
  @Get('/yandex')
  @UseGuards(AuthGuard('yandex'))
  async yandexAuth() {}

  @ApiExcludeEndpoint()
  @Get('/yandex/redirect')
  @UseGuards(AuthGuard('yandex'))
  async yandexAuthRedirect(
    @Req() req: { user: ISocialProfile },
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.login(req.user);

    await this.authService.attachTokensToResponse(user, response);

    response.redirect(this.configService.get('CLIENT_URL') as string);
  }

  @ApiExcludeEndpoint()
  @Get('/vkontakte')
  @UseGuards(AuthGuard('vkontakte'))
  async vkontakteAuth() {}

  @ApiExcludeEndpoint()
  @Get('/vkontakte/redirect')
  @UseGuards(AuthGuard('vkontakte'))
  async vkontakteAuthRedirect(
    @Req() req: { user: ISocialProfile },
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.login(req.user);

    await this.authService.attachTokensToResponse(user, response);

    response.redirect(this.configService.get('CLIENT_URL') as string);
  }
}
