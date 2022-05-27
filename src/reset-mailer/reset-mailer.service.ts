import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { AbonentModel } from 'src/db/models/abonents/abonents.model';
import { ForgotDto } from './dto/forgot.dto';
import { ResetDto } from './dto/reset.dto';
import { Request } from 'express';
import * as mustache from 'mustache';
import { resetPasswordMailTemplate } from 'src/enum/templates/resetPasswordMailTemplate';

@Injectable()
export class ResetMailerService {
  constructor(
    private readonly mailerService: MailerService,
    @Inject('AbonentModel')
    private model: ModelClass<AbonentModel>,
  ) {}

  async forgotPassword(forgotDto: ForgotDto, request: Request) {
    const user = await this.model
      .query()
      .select('email', 'username', 'id')
      .where('email', '=', forgotDto.email);
    if (!user[0]) {
      throw new HttpException(
        {
          success: false,
          data: {
            message: `No user with email ${forgotDto.email}`,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const payload = {
        email: user[0].email,
      };
      const token = jwt.sign(payload, process.env.RESET_KEY, {
        expiresIn: 60 * 15, // 15 min
      });

      const view = {
        host: request.headers.host,
        username: user[0].username,
        resetToken: token,
      };

      const mailOptions = {
        from: `Anton Shnip <${process.env.EMAIL_USERNAME}>`,
        to: `${user[0].email}`, // list of receivers
        subject: 'Password reset', // Subject line
        text: `Click to reset your password http://${request.headers.host}/password/reset/${token}`, // plaintext body
        html: mustache.render(resetPasswordMailTemplate, view), // html body
      };

      await this.mailerService.sendMail(mailOptions);

      return {
        success: true,
        data: {
          message: 'Reset link has been sent',
        },
      };
    }
  }

  async resetPassword(resetDto: ResetDto, resetKey: string) {
    const decoded: any = jwt.decode(resetKey);
    if (Date.now() >= decoded.exp * 1000) {
      throw new HttpException(
        {
          success: false,
          data: {
            message: `Token has been expired`,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const user = await this.model
        .query()
        .select('email', 'username', 'id')
        .where('email', '=', decoded.email);
      if (!user[0]) {
        throw new HttpException(
          {
            success: false,
            data: {
              message: `No user with email ${resetDto.email}`,
            },
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const salt = bcrypt.genSaltSync(8);
        const hashedPassword = await bcrypt.hash(resetDto.password, salt);

        await this.model.query().findById(user[0].id).patch({
          password: hashedPassword,
        });
        return {
          success: true,
          data: {
            message: `Password for ${decoded.email} has been changed`,
          },
        };
      }
    }
  }
}
