import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AnimalsModule } from './animals/animals.module';
import { DatabaseModule } from './db/database.module';
import { AbonentsModule } from './abonents/abonents.module';
import { AuthModule } from './auth/auth.module';
import { AbonentsService } from './abonents/abonents.service';
import { ResetMailerModule } from './reset-mailer/reset-mailer.module';
import { CarsModule } from './cars/cars.module';
import { ApolloDriver } from '@nestjs/apollo';
import { CarsResolver } from './cars/cars.resolver';
import { CarsService } from './cars/cars.service';

@Module({
  imports: [
    UsersModule,
    AnimalsModule,
    AbonentsModule,
    DatabaseModule,
    AuthModule,
    ResetMailerModule,
    CarsModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: true,
      playground: true,
    }),
  ],
  controllers: [],
  providers: [AbonentsService, CarsResolver, CarsService],
})
export class AppModule {}
