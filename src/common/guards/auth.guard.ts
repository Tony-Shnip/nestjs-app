import {
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ModelClass } from 'objection';
import { AbonentModel } from 'src/db/models/abonents/abonents.model';

@Injectable()
export class AuthenticatedGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    @Inject('AbonentModel')
    private model: ModelClass<AbonentModel>,
  ) {
    super();
  }

  roles: string[];

  canActivate(context: ExecutionContext) {
    this.roles = this.reflector.get<string[]>('roles', context.getHandler());
    const ctx = context.switchToHttp().getRequest();
    if (ctx.isAuthenticated()) {
      if (!this.roles.includes(ctx.session.passport.user.role)) {
        return super.canActivate(context);
      } else {
        return true;
      }
    } else {
      return super.canActivate(context);
    }
  }

  handleRequest(err, userPayload, info) {
    if (err || !userPayload) {
      throw new HttpException(
        {
          success: false,
          data: {
            message: `Forbidden: you do not have access`,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return new Promise((resolve, reject) => {
        this.model
          .query()
          .findById(userPayload.id)
          .then(user => {
            if (!this.roles.includes(user.role)) {
              reject(
                new HttpException(
                  {
                    success: false,
                    data: {
                      message: `Forbidden: you do not have access`,
                    },
                  },
                  HttpStatus.BAD_REQUEST,
                ),
              );
            } else {
              resolve(userPayload);
            }
          });
      });
    }
    return userPayload;
  }
}
