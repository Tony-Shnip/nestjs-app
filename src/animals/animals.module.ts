import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { validateRequest } from 'src/middlewares/validation/animals.validator';
import { AnimalsController } from './animals.controller';
import { AnimalsService } from './animals.service';

@Module({
  providers: [AnimalsService],
  controllers: [AnimalsController],
})
export class AnimalsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(validateRequest).forRoutes(
      {
        path: 'animals',
        method: RequestMethod.POST,
      },
      {
        path: 'animals/:id',
        method: RequestMethod.PUT,
      },
    );
  }
}
