import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ResetMailerController } from './reset-mailer.controller';
import { ResetMailerService } from './reset-mailer.service';

@Module({
  controllers: [ResetMailerController],
  providers: [ResetMailerService],
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    }),
  ],
})
export class ResetMailerModule {}
