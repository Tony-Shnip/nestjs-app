import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import * as bcrypt from 'bcrypt';
import { AbonentModel } from 'src/db/models/abonents/abonents.model';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AbonentModel')
    private model: ModelClass<AbonentModel>,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.model
      .query()
      .select('id', 'username', 'password', 'email', 'role')
      .where('email', '=', email);

    if (!user[0]) {
      return null;
    } else {
      const valid = await bcrypt.compare(password, user[0].password);
      if (valid) {
        const { password, ...result } = user[0];
        return result;
      } else {
        return null;
      }
    }
  }

  async loginJwt(user: any) {
    const payload = { email: user.email };
    const token = jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: '3h',
    });
    return {
      token: token,
    };
  }
}
