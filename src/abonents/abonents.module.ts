import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { validateRequest } from 'src/middlewares/validation/abonents.validator';
import { AbonentsController } from './abonents.controller';
import { AbonentsService } from './abonents.service';

@Module({
  providers: [AbonentsService],
  controllers: [AbonentsController],
})
export class AbonentsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(validateRequest).forRoutes({
      path: 'abonents/:id',
      method: RequestMethod.PUT,
    });
  }
}
