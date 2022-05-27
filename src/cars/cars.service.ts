import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { CarsModel } from 'src/db/models/cars/cars.model';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
@Injectable()
export class CarsService {
  constructor(
    @Inject('CarsModel')
    private model: ModelClass<CarsModel>,
  ) {}

  async getAll(): Promise<object> {
    const allCars = await this.getAllCarsFromDB();
    return {
      success: true,
      data: {
        message: allCars,
      },
    };
  }

  async getAllCarsFromDB() {
    return await this.model.query();
  }

  async getOne(id: string): Promise<object> {
    const someCar = await this.getOneCarFromDB(id);
    return {
      success: true,
      data: {
        message: someCar,
      },
    };
  }

  async getOneCarFromDB(id: string) {
    const car = await this.model.query().findById(id);
    if (!car) {
      throw new HttpException(
        {
          success: false,
          data: {
            message: `No car with id ${id}`,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return car;
    }
  }

  async create(createCarDto: CreateCarDto): Promise<object> {
    const newCar = await this.insertCarIntoDB(createCarDto);
    return {
      success: true,
      data: {
        message: `Car ${newCar.condition} ${newCar.brand} has been added`,
      },
    };
  }

  async insertCarIntoDB(createCarDto: CreateCarDto) {
    return await this.model.query().insert({
      brand: createCarDto.brand,
      year: createCarDto.year,
      condition: createCarDto.condition,
      price: createCarDto.price,
    });
  }

  async update(updateCarDto: UpdateCarDto, id: string): Promise<object> {
    const updatedCar = await this.updateCarInDB(updateCarDto, id);
    return {
      success: true,
      data: {
        message: `Car ${updatedCar.id} has been updated`,
      },
    };
  }

  async updateCarInDB(updateCarDto: UpdateCarDto, id: string) {
    const carToUpdate = await this.model.query().findById(id);
    if (!carToUpdate) {
      throw new HttpException(
        {
          success: false,
          data: {
            message: `No car with id ${id}`,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      await this.model
        .query()
        .findById(id)
        .patch({
          brand: updateCarDto.brand ? updateCarDto.brand : carToUpdate.brand,
          year: updateCarDto.year ? updateCarDto.year : carToUpdate.year,
          condition: updateCarDto.condition
            ? updateCarDto.condition
            : carToUpdate.condition,
          price: updateCarDto.price ? updateCarDto.price : carToUpdate.price,
        });
    }
    return await this.model.query().findById(id);
  }

  async delete(id: string) {
    const deletedCar = await this.deleteCarFromDB(id);
    return {
      success: true,
      data: {
        message: `${deletedCar.id} car has been deleted`,
      },
    };
  }

  async deleteCarFromDB(id: string) {
    const carToDelete = await this.model.query().findById(id);
    if (!carToDelete) {
      throw new HttpException(
        {
          success: false,
          data: {
            message: `No car with id ${id}`,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      await this.model.query().deleteById(id);
      return carToDelete;
    }
  }
}
