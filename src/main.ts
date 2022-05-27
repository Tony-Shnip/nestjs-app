import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import * as session from 'cookie-session';
import * as passport from 'passport';
import helmet from 'helmet';
import { join } from 'path';
import { AppModule } from './app.module';
import { Logger } from './middlewares/logger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '../..', 'public'));
  app.setBaseViewsDir(join(__dirname, '../..', 'views'));
  app.setViewEngine('hbs');

  app.use(Logger);
  //comment helmet to allow /graphql
  // app.use(helmet());
  app.enableCors({
    maxAge: 5,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: 'Authorization',
  });
  app.use(
    session({
      key: 'token',
      secret: process.env.COOKIE_KEY,
      cookie: {
        maxAge: 3600000 * 3, // 3h
        sameSite: true,
        secure: false,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
