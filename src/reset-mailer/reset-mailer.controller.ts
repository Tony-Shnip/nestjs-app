import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { ForgotDto } from './dto/forgot.dto';
import { ResetDto } from './dto/reset.dto';
import { ResetMailerService } from './reset-mailer.service';

@Controller('password')
export class ResetMailerController {
  constructor(private readonly resetMailerService: ResetMailerService) {}

  @Post('forgot')
  forgotPassword(@Req() request: Request, @Body() forgotDto: ForgotDto) {
    return this.resetMailerService.forgotPassword(forgotDto, request);
  }

  @Post('reset/:resetKey')
  resetPassword(@Param('resetKey') resetKey, @Body() resetDto: ResetDto) {
    return this.resetMailerService.resetPassword(resetDto, resetKey);
  }
}
