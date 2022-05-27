import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { UserModel } from 'src/db/models/users/users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserModel')
    private model: ModelClass<UserModel>,
  ) {}

  async getAll(): Promise<object> {
    const allUsers = await this.model.query();
    return {
      success: true,
      data: {
        message: allUsers,
      },
    };
  }

  async getOne(id: string): Promise<object> {
    const someUser = await this.model.query().findById(id);
    if (!someUser) {
      throw new HttpException(
        {
          success: false,
          data: {
            message: `No user with id ${id}`,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return {
        success: true,
        data: {
          message: someUser,
        },
      };
    }
  }

  async create(createUserDto: CreateUserDto): Promise<object> {
    const newUser = await this.model.query().insert({
      name: createUserDto.name,
      surname: createUserDto.surname,
      age: createUserDto.age,
    });
    return {
      success: true,
      data: {
        message: `User ${newUser.name} ${newUser.surname} has been added`,
      },
    };
  }

  async update(updateUserDto: UpdateUserDto, id: string): Promise<object> {
    const someUser = await this.model.query().findById(id);
    if (!someUser) {
      throw new HttpException(
        {
          success: false,
          data: {
            message: `No user with id ${id}`,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      await this.model
        .query()
        .findById(id)
        .patch({
          name: updateUserDto.name ? updateUserDto.name : someUser.name,
          surname: updateUserDto.surname
            ? updateUserDto.surname
            : someUser.surname,
          age: updateUserDto.age ? updateUserDto.age : someUser.age,
        });
      return {
        success: true,
        data: {
          message: `User ${id} has been updated`,
        },
      };
    }
  }

  async delete(id: string): Promise<object> {
    const someUser = await this.model.query().findById(id);
    if (!someUser) {
      throw new HttpException(
        {
          success: false,
          data: {
            message: `No user with id ${id}`,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const numDeleted = await this.model.query().deleteById(id);
      return {
        success: true,
        data: {
          message: `${numDeleted} user has been deleted`,
        },
      };
    }
  }

  async getPets(id: string): Promise<object> {
    const someUser = await this.model.query().findById(id);
    if (!someUser) {
      throw new HttpException(
        {
          success: false,
          data: {
            message: `No user with id ${id}`,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const pets = await this.model
        .relatedQuery('pets')
        .for(id)
        .orderBy('name');
      if (pets.length) {
        return {
          success: true,
          data: {
            message: pets,
          },
        };
      } else {
        return {
          success: true,
          data: {
            message: `User ${id} has no pets`,
          },
        };
      }
    }
  }
}
