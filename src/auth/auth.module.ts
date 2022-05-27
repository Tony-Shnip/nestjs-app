import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AbonentsModule } from 'src/abonents/abonents.module';
import { AbonentsService } from 'src/abonents/abonents.service';
import { validateRequest } from 'src/middlewares/validation/abonents.validator';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy, LocalStrategy } from './passport.config';
import { SessionSerializer } from './session.serializer';

@Module({
  providers: [
    AuthService,
    LocalStrategy,
    SessionSerializer,
    AbonentsService,
    JwtStrategy,
  ],
  controllers: [AuthController],
  imports: [
    AbonentsModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '3h' },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(validateRequest).forRoutes({
      path: 'register',
      method: RequestMethod.POST,
    });
  }
}
