import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { AnimalModel } from 'src/db/models/animals/animals.model';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';

@Injectable()
export class AnimalsService {
  constructor(
    @Inject('AnimalModel')
    private model: ModelClass<AnimalModel>,
  ) {}

  async getAll(): Promise<object> {
    const allAnimals = await this.model.query();
    return {
      success: true,
      data: {
        message: allAnimals,
      },
    };
  }

  async getOne(id: string): Promise<object> {
    const someAnimal = await this.model.query().findById(id);
    if (!someAnimal) {
      throw new HttpException(
        {
          success: false,
          data: {
            message: `No animal with id ${id}`,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return {
        success: true,
        data: {
          message: someAnimal,
        },
      };
    }
  }

  async create(createAnimalDto: CreateAnimalDto): Promise<object> {
    const newAnimal = await this.model.query().insert({
      name: createAnimalDto.name,
      type: createAnimalDto.type,
      age: createAnimalDto.age,
      ownerId: createAnimalDto.ownerId,
    });
    return {
      success: true,
      data: {
        message: `Animal ${newAnimal.type} ${newAnimal.name} has been added`,
      },
    };
  }

  async update(updateAnimalDto: UpdateAnimalDto, id: string): Promise<object> {
    const someAnimal = await this.model.query().findById(id);
    if (!someAnimal) {
      throw new HttpException(
        {
          success: false,
          data: {
            message: `No animal with id ${id}`,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      await this.model
        .query()
        .findById(id)
        .patch({
          name: updateAnimalDto.name ? updateAnimalDto.name : someAnimal.name,
          type: updateAnimalDto.type ? updateAnimalDto.type : someAnimal.type,
          age: updateAnimalDto.age ? updateAnimalDto.age : someAnimal.age,
          ownerId: updateAnimalDto.ownerId
            ? updateAnimalDto.ownerId
            : someAnimal.ownerId,
        });
      return {
        success: true,
        data: {
          message: `Animal ${id} has been updated`,
        },
      };
    }
  }

  async delete(id: string) {
    const someAnimal = await this.model.query().findById(id);
    if (!someAnimal) {
      throw new HttpException(
        {
          success: false,
          data: {
            message: `No animal with id ${id}`,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const numDeleted = await this.model.query().deleteById(id);
      return {
        success: true,
        data: {
          message: `${numDeleted} animal has been deleted`,
        },
      };
    }
  }
}
