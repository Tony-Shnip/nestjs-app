import * as Local from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ModelClass } from 'objection';
import { AbonentModel } from 'src/db/models/abonents/abonents.model';

@Injectable()
export class LocalStrategy extends PassportStrategy(Local.Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      session: true,
    });
  }

  async validate(username: string, password: string) {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject('AbonentModel')
    private model: ModelClass<AbonentModel>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_KEY,
    });
  }

  async validate(payload: any) {
    const abonent = await this.model
      .query()
      .select('id', 'username', 'password', 'email')
      .where('email', '=', payload.email);
    if (abonent[0]) {
      abonent[0].password = undefined;
      return abonent[0];
    } else {
      return null;
    }
  }
}
