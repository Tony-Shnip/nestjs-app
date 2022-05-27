import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { validateRequest } from 'src/middlewares/validation/users.validator';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(validateRequest).forRoutes(
      {
        path: 'users',
        method: RequestMethod.POST,
      },
      {
        path: 'users/:id',
        method: RequestMethod.PUT,
      },
    );
  }
}
