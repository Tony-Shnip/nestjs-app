import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Request,
  Res,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { LoginGuard } from '../common/guards/login.guard';
import { AuthenticatedGuard } from '../common/guards/auth.guard';
import { AbonentsService } from '../abonents/abonents.service';
import { CreateAbonentDto } from '../abonents/dto/create-abonent.dto';
import { AuthGuard } from '@nestjs/passport';
import { LoginAbonentDto } from './dto/login-abonent.dto';
import { AuthService } from './auth.service';
import { roles } from 'src/enum/roles';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly abonentsService: AbonentsService,
  ) {}

  @Get('/')
  @Render('mainPage')
  mainPage() {
    return { hehe: 'haha' };
  }

  @Get('/register')
  @Render('register')
  getRegister() {
    return { hehe: 'haha' };
  }

  @Post('/register')
  @Render('registerAns')
  register(@Body() createAbonentDto: CreateAbonentDto) {
    return this.abonentsService.create(createAbonentDto);
  }

  @UseGuards(LoginGuard)
  @Post('/login/cookie')
  @Render('loginAns')
  loginCookie(@Res() res: Response) {
    return {
      success: true,
      data: {
        message: 'You have been authenticated',
      },
    };
  }

  @Get('/login')
  @Render('login')
  login() {
    return { hehe: 'haha' };
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  @Render('loginAns')
  async loginJwt(@Body() loginAbonentDto: LoginAbonentDto) {
    return await this.authService.loginJwt(loginAbonentDto);
  }

  @SetMetadata('roles', [roles.user])
  @UseGuards(AuthenticatedGuard)
  @Get('/check')
  checkJwt(@Request() req) {
    return 'Guarded point';
  }

  @Get('/logout')
  @Render('logout')
  logout(@Request() req, @Res() res: Response) {
    req.logout();
    return {
      success: true,
      data: {
        message: 'Logged out',
      },
    };
  }
}
