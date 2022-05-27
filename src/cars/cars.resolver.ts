import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ModelClass } from 'objection';
import { CarsModel } from 'src/db/models/cars/cars.model';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Resolver(of => CarsModel)
export class CarsResolver {
  constructor(
    private carsService: CarsService,
    @Inject('CarsModel')
    private model: ModelClass<CarsModel>,
  ) {}

  @Query(returns => [CarsModel])
  async getAllCars() {
    return this.carsService.getAllCarsFromDB();
  }

  @Query(returns => CarsModel)
  async getOneCar(@Args('id') id: string) {
    return this.carsService.getOneCarFromDB(id);
  }

  @Mutation(returns => CarsModel)
  async createCar(@Args('payload') payload: CreateCarDto) {
    return this.carsService.insertCarIntoDB(payload);
  }

  @Mutation(returns => CarsModel)
  async updateCar(
    @Args('id') id: string,
    @Args('payload') payload: UpdateCarDto,
  ) {
    return await this.carsService.updateCarInDB(payload, id);
  }

  @Mutation(returns => CarsModel)
  async deleteCar(@Args('id') id: string) {
    return await this.carsService.deleteCarFromDB(id); //add mark "to delete" in DB or smth
  }
}
