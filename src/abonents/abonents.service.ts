import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import * as bcrypt from 'bcrypt';
import { AbonentModel } from 'src/db/models/abonents/abonents.model';
import { CreateAbonentDto } from './dto/create-abonent.dto';
import { UpdateAbonentDto } from './dto/update-abonent.dto';

@Injectable()
export class AbonentsService {
  constructor(
    @Inject('AbonentModel')
    private model: ModelClass<AbonentModel>,
  ) {}

  async getAll(): Promise<object> {
    const allAbonents = await this.model.query();
    return {
      success: true,
      data: {
        message: allAbonents,
      },
    };
  }

  async getOne(id: string): Promise<object> {
    const someAbonent = await this.model.query().findById(id);
    if (!someAbonent) {
      throw new HttpException(
        {
          success: false,
          data: {
            message: `No abonent with id ${id}`,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return {
        success: true,
        data: {
          message: someAbonent,
        },
      };
    }
  }

  async create(createAbonentDto: CreateAbonentDto): Promise<object> {
    const salt = bcrypt.genSaltSync(8);
    const hashedPassword = await bcrypt.hash(createAbonentDto.password, salt);
    if (hashedPassword) {
      try {
        const newAbonent = await this.model.query().insert({
          username: createAbonentDto.username,
          password: hashedPassword,
          role: createAbonentDto.role,
          email: createAbonentDto.email,
        });
        return {
          success: true,
          data: {
            message: `Abonent ${newAbonent.username} has been added as ${newAbonent.role}`,
          },
        };
      } catch (err) {
        throw new HttpException(
          {
            success: false,
            data: {
              message: `Registartion has been failed`,
            },
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      throw new HttpException(
        {
          success: false,
          data: {
            message: 'Registartion error: failed to hash password',
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    updateAbonentDto: UpdateAbonentDto,
    id: string,
  ): Promise<object> {
    const someAbonent = await this.model.query().findById(id);
    if (!someAbonent) {
      throw new HttpException(
        {
          success: false,
          data: {
            message: `No abonent with id ${id}`,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      await this.model
        .query()
        .findById(id)
        .patch({
          username: updateAbonentDto.username
            ? updateAbonentDto.username
            : someAbonent.username,
          password: updateAbonentDto.password
            ? updateAbonentDto.password
            : someAbonent.password,
          role: updateAbonentDto.role
            ? updateAbonentDto.role
            : someAbonent.role,
          email: updateAbonentDto.email
            ? updateAbonentDto.email
            : someAbonent.email,
        });
      return {
        success: true,
        data: {
          message: `Abonent ${id} has been updated`,
        },
      };
    }
  }

  async delete(id: string): Promise<object> {
    const someAbonent = await this.model.query().findById(id);
    if (!someAbonent) {
      throw new HttpException(
        {
          success: false,
          data: {
            message: `No abonent with id ${id}`,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const numDeleted = await this.model.query().deleteById(id);
      return {
        success: true,
        data: {
          message: `${numDeleted} abonent has been deleted`,
        },
      };
    }
  }
}
